const User = require("../models/User");

function createUser(req, res) {
  res.json({ message: "creado" });
}

module.exports = createUser;
