const router = require("express").Router();
const { verifyImagesChapter } = require("../middlewares/verifyImage");
const {
  getChapters,
  createChapters,
} = require("../controllers/chapter.controller");

router.get("/", getChapters);
router.post("/:id", createChapters);

module.exports = router;
