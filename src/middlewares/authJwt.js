require("dotenv").config();
const User = require("../models/User");
const { rol: Role } = require("../models/Role");
const jwt = require("jsonwebtoken");
const { SECRET_WORD } = process.env;

async function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.toLowerCase().startsWith("bearer"))
    return res.status(404).json({ message: "token no enviado" });

  const token = authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, SECRET_WORD);
    req.id = decode.id;
  } catch (error) {
    return next(error);
  }

  const user = await User.findById(req.id, { password: 0 });
  if (!user)
    return res.status(404).json({ message: "el usuario no tiene permiso" });

  next();
}

// importante asignar el id en req ya que esto permitira ser utilizado en todo
async function isModerator(req, res, next) {
  const user = await User.findById(req.id);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (role of roles) {
    if (role.name === "moderator") {
      return next();
    }
  }
  return res
    .status(403)
    .json({ message: "No tiene permiso para realizar esta accion" });
}

async function isAdmin(req, res, next) {
  const user = await User.findById(req.id);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (role of roles) {
    if (role.name === "admin") {
      return next();
    }
  }
  return res
    .status(403)
    .json({ message: "No tiene permiso para realizar esta accion" });
}

module.exports = { verifyToken, isModerator, isAdmin };
