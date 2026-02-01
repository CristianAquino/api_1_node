const router = require("express").Router();
const signinSchema = require("../validation/signin");
const { signup, signin } = require("../controllers/auth.controller");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignup");
const { formValidate } = require("../middlewares/formValidate");

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", formValidate(signinSchema), signin);

module.exports = router;
