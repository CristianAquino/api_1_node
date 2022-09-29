const Chapter = require("../models/Chapter");
const Folder = require("../models/Folder");
const { uploadImage } = require("../libs/cloudinary");

async function createChapters(req, res) {
  const { idFolder } = req.params;
  const { name } = req.body;

  const folder = await Folder.findById(idFolder);
  const newChapter = new Chapter({
    name,
  });

  const { image } = req.files;

  for (img of image) {
    let upload = await uploadImage(img.tempFilePath, folder.name);
    newChapter.images = newChapter.images.concat(upload.url);
  }
  newChapter.folder = folder._id;

  const savedChapter = await newChapter.save();
  folder.chapters = folder.chapters.concat(savedChapter._id);
  await folder.save();
  res.json(savedChapter);
}
function getAllChapters(req, res) {
  Chapter.find({})
    .populate("folder", { name: 1 })
    .then((chapter) => res.status(200).json(chapter))
    .catch((error) => next(error));
}
function getChapterById(req, res) {
  const { id } = req.params;
  Chapter.findById(id)
    .populate("folder", { name: 1, _id: 0 })
    .then((chapter) => res.status(200).json(chapter))
    .catch((error) => next(error));
}

module.exports = { getAllChapters, createChapters, getChapterById };
