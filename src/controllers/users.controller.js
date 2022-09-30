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

  const foundRoles = await Role.findOne({ name: roles[0] });
  newUser.roles = newUser.roles.concat(foundRoles._id);
  // const foundRoles = await Role.find({ name: { $in: roles } });
  // newUser.roles = foundRoles.map((rol) => rol._id);

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

async function updateDataUser(req, res, next) {
  const { body } = req;

  if (body.password) {
    body.password = await User.encryptPassword(body.password);
  }

  User.findByIdAndUpdate(req.id, body, { new: true })
    .then((update) => {
      if (!update) {
        return res
          .status(404)
          .json({ message: "no se encontro el usuario a actualizar" });
      }
      return res.status(202).json(update);
    })
    .catch((error) => next(error));
}

function deleteUserById(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id).then((del) => {
    if (!del) {
      return res.status(404).json({ message: "no existe el usuario" });
    }
    return res.status(200).json({ message: `user with id: ${id} deleted` });
  });
}

async function updateRol(req, res) {
  const { id } = req.params;
  const { roles } = req.body;
  const user = await User.findById(id);

  const foundRoles = await Role.findOne({ name: roles[0] });
  user.roles = user.roles.concat(foundRoles._id);

  await user.save();

  res.status(201).json({ message: "se agrego un nuevo rol" });
}

module.exports = {
  createUser,
  getDataUser,
  updateDataUser,
  deleteUserById,
  updateRol,
};
