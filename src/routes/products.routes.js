const router = require("express").Router();
const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const {
  getProduct,
  getProductById,
  createProducts,
  deleteProductById,
  updateProductById,
} = require("../controllers/products.controller");

router.post("/", [verifyToken, isModerator], createProducts);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.put("/:id", [verifyToken, isAdmin], updateProductById);
router.delete("/:id", [verifyToken, isAdmin], deleteProductById);

module.exports = router;
