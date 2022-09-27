const router = require("express").Router();
const { signup, signin } = require("../controllers/auth.controller");
const {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} = require("../middlewares/verifySignup");

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signup
);
router.post("/signin", signin);

module.exports = router;
