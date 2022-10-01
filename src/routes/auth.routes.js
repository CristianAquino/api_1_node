const router = require("express").Router();
const { signup, signin } = require("../controllers/auth.controller");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignup");

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);

module.exports = router;
