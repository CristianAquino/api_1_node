const router = require("express").Router();
const { verifyImagesChapter } = require("../middlewares/verifyImage");
const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const {
  getAllChapters,
  createChapters,
  getChapterById,
  deleteChapterById,
} = require("../controllers/chapter.controller");

router.get("/", getAllChapters);
router.post("/:idFolder", verifyImagesChapter, createChapters);
router.get("/:id", getChapterById);
router.delete("/:id", deleteChapterById);

module.exports = router;
