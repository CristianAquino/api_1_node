const Folder = require("../models/Folder");
const User = require("../models/User");
const Chapter = require("../models/Chapter");
const {
  uploadImage,
  deleteFolder,
  deleteImage,
} = require("../libs/cloudinary");

async function createFolders(req, res) {
  const { name, description } = req.body;
  const { image } = req.files;

  const upload = await uploadImage(image.tempFilePath, name);
  const user = await User.findById(req.id);

  const newFolder = new Folder({
    name,
    description,
  });

  newFolder.image.url = upload.url;
  newFolder.image.public_id = upload.public_id;
  newFolder.creator = user._id;

  const savedFolder = await newFolder.save();

  user.folders = user.folders.concat(savedFolder._id);
  await user.save();

  res.status(201).json(savedFolder);
}

function getAllFolders(req, res, next) {
  Folder.find({})
    .populate("creator", { username: 1, email: 1, _id: 0 })
    .populate("chapters", { name: 1, images: 1, _id: 0 })
    .then((folder) => res.status(200).json(folder))
    .catch((error) => next(error));
}

function getFolderById(req, res, next) {
  const { id } = req.params;
  Folder.findById(id)
    .populate("creator", { username: 1, email: 1, _id: 0 })
    .populate("chapters", { name: 1, images: 1, _id: 0 })
    .then((folder) => {
      if (!folder) {
        return res
          .status(404)
          .json({ message: `No se encontro el folder con id: ${id}` });
      }
      return res.status(200).json(folder);
    })
    .catch((error) => next(error));
}

async function deleteFolderById(req, res, next) {
  const { id } = req.params;

  const folder = await Folder.findById(id).populate("chapters");
  const chapters = await Chapter.find({ folder: id });

  try {
    for (ch of chapters) {
      for (img of ch.images) {
        await deleteImage(img.public_id);
      }
    }

    await deleteFolder(folder.image.public_id, folder.name);
  } catch (error) {
    next(error);
  }

  const user = await User.findById(folder.creator);

  const out = user.folders.findIndex((folder) => folder == id);
  user.folders.splice(out, 1);

  await user.save();
  await Folder.findByIdAndDelete(id);
  await Chapter.deleteMany({ folder: id });

  res.json("delete");
}

module.exports = {
  getAllFolders,
  createFolders,
  getFolderById,
  deleteFolderById,
};
