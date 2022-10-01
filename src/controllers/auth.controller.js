require("dotenv").config();
const User = require("../models/User");
const { rol: Role } = require("../models/Role");
const jwt = require("jsonwebtoken");
const { SECRET_WORD } = process.env;

// considerar solo usuario
async function signup(req, res) {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // if (roles) {
  //   const foundRoles = await Role.find({ name: { $in: roles } });
  //   newUser.roles = foundRoles.map((rol) => rol._id);
  // } else {
  //   const role = await Role.findOne({ name: "user" });
  //   newUser.roles = [role._id];
  // }
  const role = await Role.findOne({ name: "user" });
  newUser.roles = [role._id];

  const savedUser = await newUser.save();

  const userForToken = {
    id: savedUser._id,
    email: savedUser.email,
    roles: [{ name: role.name }],
  };

  const token = jwt.sign(userForToken, SECRET_WORD, {
    expiresIn: 60 * 60 * 24,
  });

  res.status(200).json({ token });
}

async function signin(req, res) {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email }).populate("roles", { _id: 0 });
  const matchPassword =
    userFound == null
      ? false
      : await User.comparePassword(password, userFound.password);
  if (!(userFound && matchPassword))
    return res.status(401).json({ message: "Contrasena o usuario invalido" });

  const userForToken = {
    id: userFound._id,
    email: userFound.email,
    roles: userFound.roles,
  };

  const token = jwt.sign(userForToken, SECRET_WORD, {
    expiresIn: 60 * 60 * 24,
  });

  res.status(200).json({ token });
}

module.exports = { signup, signin };
