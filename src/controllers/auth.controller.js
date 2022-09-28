require("dotenv").config();
const User = require("../models/User");
const { rol: Role } = require("../models/Role");
const jwt = require("jsonwebtoken");
const { SECRET_WORD } = process.env;

async function signup(req, res) {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((rol) => rol._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const userForToken = {
    id: savedUser._id,
    email: savedUser.email,
  };
  const token = jwt.sign(userForToken, SECRET_WORD, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ token });
}
async function signin(req, res) {
  const { email, password } = req.body;

  // const userFound = await User.findOne({ email }).populate("roles", { _id: 0 });
  const userFound = await User.findOne({ email });
  const matchPassword =
    userFound == null
      ? false
      : await User.comparePassword(password, userFound.password);
  if (!(userFound && matchPassword))
    return res.status(401).json({ message: "Contrasena o usuario invalido" });

  const userForToken = {
    id: userFound._id,
    email: userFound.email,
  };

  const token = jwt.sign(userForToken, SECRET_WORD, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ token });
}

module.exports = { signup, signin };
