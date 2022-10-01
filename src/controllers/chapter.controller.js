const Chapter = require("../models/Chapter");
const Folder = require("../models/Folder");
const { uploadImage, deleteImage } = require("../libs/cloudinary");

async function createChapters(req, res) {
  const { idFolder } = req.params;
  const { name } = req.body;

  const folder = await Folder.findById(idFolder);
  const newChapter = new Chapter({
    name,
  });

  const { image } = req.files;

  if (image >= 2) {
    for (img of image) {
      let upload = await uploadImage(img.tempFilePath, folder.name);
      newChapter.images.url = upload.url;
      newChapter.images.public_id = upload.public_id;
      newChapter.images = newChapter.images.concat({
        url: newChapter.images.url,
        public_id: newChapter.images.public_id,
      });
    }
  } else {
    let upload = await uploadImage(image.tempFilePath, folder.name);
    newChapter.images.url = upload.url;
    newChapter.images.public_id = upload.public_id;
    newChapter.images = newChapter.images.concat({
      url: newChapter.images.url,
      public_id: newChapter.images.public_id,
    });
  }

  newChapter.folder = folder._id;

  const savedChapter = await newChapter.save();
  folder.chapters = folder.chapters.concat(savedChapter._id);
  await folder.save();

  res.status(200).json(savedChapter);
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
    .then((chapter) => {
      if (!chapter) {
        return res
          .status(404)
          .json({ message: `No se encontro el capitulo con id: ${id}` });
      }
      return res.status(200).json(chapter);
    })
    .catch((error) => next(error));
}

async function deleteChapterById(req, res) {
  const { id } = req.params;
  const chapter = await Chapter.findById(id);

  for (img of chapter.images) {
    await deleteImage(img.public_id);
  }

  const folder = await Folder.findById(chapter.folder);

  const out = folder.chapters.findIndex((chapter) => chapter == id);
  folder.chapters.splice(out, 1);

  await folder.save();
  await Chapter.findByIdAndDelete(id);

  res.status(200).json({ message: `chapter with id: ${id} deleted` });
}

module.exports = {
  getAllChapters,
  createChapters,
  getChapterById,
  deleteChapterById,
};
