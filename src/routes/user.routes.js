const router = require("express").Router();
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignup");
const {
  createUser,
  getDataUser,
  updateDataUser,
  deleteUserById,
  updateRol,
} = require("../controllers/users.controller");

router.post(
  "/",
  [verifyToken, isAdmin, checkRolesExisted, checkDuplicateUsernameOrEmail],
  createUser
);
router.get("/", verifyToken, getDataUser);
// usuario comun actualiza sus datos
router.put("/", verifyToken, updateDataUser);
// admin asigna roles
router.put("/:id", [verifyToken, isAdmin, checkRolesExisted], updateRol);
router.delete("/:id", [verifyToken, isAdmin], deleteUserById);

module.exports = router;
