const { rol: Rol } = require("../models/Role");

async function createRoles() {
  try {
    const count = await Rol.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Rol({ name: "user" }).save(),
      new Rol({ name: "moderator" }).save(),
      new Rol({ name: "admin" }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
}

module.exports = createRoles;
