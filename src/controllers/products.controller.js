const Product = require("../models/Product");
const { uploadImage, deleteImage } = require("../libs/cloudinary");

function createProducts(req, res, next) {
  const { name, category, price, imgUrl } = req.body;
  const newProduct = new Product({ name, category, price, imgUrl });
  newProduct
    .save()
    .then((productSave) => res.status(201).json(productSave))
    .catch((error) => next(error));
}
function getProduct(req, res, next) {
  Product.find({})
    .then((products) => res.status(200).json(products))
    .catch((error) => next(error));
}
function getProductById(req, res, next) {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "no se encontro producto" });
      }
      return res.status(200).json(product);
    })
    .catch((error) => next(error));
}

function updateProductById(req, res, next) {
  const { id } = req.params;
  const { body } = req;
  Product.findByIdAndUpdate(id, body, { new: true })
    .then((update) => {
      if (!update) {
        return res
          .status(404)
          .json({ message: "no se encontro el producto a actualizar" });
      }
      return res.status(202).json(update);
    })
    .catch((error) => next(error));
}
function deleteProductById(req, res, next) {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((del) => {
      if (!del) {
        return res.status(404).json({ message: "no existe el producto" });
      }
      return res
        .status(200)
        .json({ message: `product with id: ${id} deleted` });
    })
    .catch((error) => next(error));
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
