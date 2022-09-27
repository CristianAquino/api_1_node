const Product = require("../models/Product");
const { uploadImage, deleteImage } = require("../libs/cloudinary");

function createProducts(req, res) {
  const { name, category, price, imgUrl } = req.body;
  const newProduct = new Product({ name, category, price, imgUrl });
  newProduct.save().then((productSave) => res.status(201).json(productSave));
}
function getProduct(req, res) {
  Product.find({}).then((products) => res.status(200).json(products));
}
function getProductById(req, res) {
  const { id } = req.params;
  Product.findById(id).then((product) => res.status(200).json(product));
}

function updateProductById(req, res) {
  const { id } = req.params;
  const { body } = req;
  Product.findByIdAndUpdate(id, body, { new: true }).then((update) =>
    res.status(202).json(update)
  );
}
function deleteProductById(req, res) {
  const { id } = req.params;
  Product.findByIdAndDelete(id).then(() =>
    res.status(200).json({ message: `product with id: ${id} deleted` })
  );
}

async function sendImage(req, res) {
  const { image } = req.files;
  const upload = await uploadImage(image.tempFilePath, "hola");
  console.log(upload.url);
  res.json({ message: "imagen guardada" });
}

module.exports = {
  getProduct,
  getProductById,
  createProducts,
  deleteProductById,
  updateProductById,
  sendImage,
};
