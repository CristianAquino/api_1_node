const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const { checkRolesExisted } = require("../middlewares/verifySignup");
const { createUser, getDataUser } = require("../controllers/users.controller");

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);
router.get("/", verifyToken, getDataUser);

module.exports = router;
