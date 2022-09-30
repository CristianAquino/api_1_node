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

function getDataUser(req, res, next) {
  User.findById(req.id)
    .populate("folders", {
      name: 1,
      description: 1,
      image: 1,
      chapters: 1,
      _id: 0,
    })
    .populate("roles", { _id: 0 })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: `no se encontro el usuario con id: ${id}` });
      }
      return res.status(200).json({ user });
    })
    .catch((error) => next(error));
}

module.exports = { createUser, getDataUser };
