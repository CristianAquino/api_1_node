const router = require("express").Router();
const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const { checkRolesExisted } = require("../middlewares/verifySignup");
const createUser = require("../controllers/users.controller");

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);

module.exports = router;
