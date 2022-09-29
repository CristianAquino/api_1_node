const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const { checkRolesExisted } = require("../middlewares/verifySignup");
const createUser = require("../controllers/users.controller");

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);

module.exports = router;
