const Folder = require("../models/Folder");
const User = require("../models/User");
const { uploadImage } = require("../libs/cloudinary");

async function createFolders(req, res) {
  // const { idCreator } = req.params;
  const { name, description } = req.body;
  const { image } = req.files;

  const upload = await uploadImage(image.tempFilePath, name);
  const user = await User.findById(req.id);

  const newFolder = new Folder({
    name,
    description,
    image: upload.url,
  });

  newFolder.creator = user._id;

  const savedFolder = await newFolder.save();

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
          .status(401)
          .json({ message: `No se encontro el folder con id: ${id}` });
      }
      return res.status(200).json(folder);
    })
    .catch((error) => next(error));
}

module.exports = { getAllFolders, createFolders, getFolderById };
