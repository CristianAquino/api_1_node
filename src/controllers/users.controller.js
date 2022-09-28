const User = require("../models/User");
const { rol: Role } = require("../models/Role");

async function createUser(req, res) {
  const { username, email, password, roles } = req.body;

  if (!roles)
    return res.status(404).json({ message: "es necesario ingresar un rol" });

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  const foundRoles = await Role.find({ name: { $in: roles } });
  newUser.roles = foundRoles.map((rol) => rol._id);

  const savedUser = await newUser.save();
  res
    .status(200)
    .json({ message: `se creo el usuario para ${savedUser.email}` });
}

module.exports = createUser;
