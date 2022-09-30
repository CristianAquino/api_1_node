require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

async function uploadImage(path, folder) {
  return await cloudinary.uploader.upload(path, {
    folder,
  });
}

async function deleteFolder(public_id, folderName) {
  await cloudinary.api.delete_resources(public_id);
  await cloudinary.api.delete_folder(folderName);
}

async function deleteImage(public_id) {
  await cloudinary.uploader.destroy(public_id);
}

module.exports = {
  uploadImage,
  deleteImage,
  deleteFolder,
};
