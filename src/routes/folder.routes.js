const router = require("express").Router();
const { verifyImageFolder } = require("../middlewares/verifyImage");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const {
  getAllFolders,
  createFolders,
  getFolderById,
  deleteFolderById,
} = require("../controllers/folder.controller");

router.get("/", getAllFolders);
router.post("/", [verifyToken, isAdmin, verifyImageFolder], createFolders);
router.get("/:id", getFolderById);
router.delete("/:id", deleteFolderById);

module.exports = router;
