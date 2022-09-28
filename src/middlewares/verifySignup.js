const { roles: ROLES } = require("../models/Role");
const User = require("../models/User");

function checkRolesExisted(req, res, next) {
  const { roles } = req.body;
  if (roles) {
    for (x of roles) {
      if (!ROLES.includes(x)) {
        return res.json({ message: `se ingresaron roles que no existen` });
      }
    }
  }
  next();
}

async function checkDuplicateUsernameOrEmail(req, res, next) {
  const { username, email } = req.body;
  const user = await User.findOne({ username });
  const userEmail = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ message: `el username: ${username} ya existe` });
  if (userEmail)
    return res.status(400).json({ message: `el email: ${email} ya existe` });

  next();
}
module.exports = { checkRolesExisted, checkDuplicateUsernameOrEmail };
