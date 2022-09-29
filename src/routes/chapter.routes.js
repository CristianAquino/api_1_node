const router = require("express").Router();
const { verifyImagesChapter } = require("../middlewares/verifyImage");
const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const {
  getAllChapters,
  createChapters,
  getChapterById,
} = require("../controllers/chapter.controller");

router.get("/", getAllChapters);
router.post("/:idFolder", verifyImagesChapter, createChapters);
router.get("/:id", getChapterById);

module.exports = router;
