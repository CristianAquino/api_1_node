const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false, // quita el '_v'
  }
);

// reemplazamos '_id' por 'id'
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const product = model("Product", productSchema);
module.exports = product;
