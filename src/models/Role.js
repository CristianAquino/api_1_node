const { Schema, model } = require("mongoose");

const roles = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

// reemplazamos '_id' por 'id'
roleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const rol = model("Rol", roleSchema);
module.exports = { rol, roles };
