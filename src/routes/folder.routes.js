const router = require("express").Router();
const { verifyImageFolder } = require("../middlewares/verifyImage");
const {
  getFolders,
  createFolders,
  getFolderById,
} = require("../controllers/folder.controller");

router.get("/", getFolders);
router.post("/:id", verifyImageFolder, createFolders);
router.get("/:id", getFolderById);

module.exports = router;
