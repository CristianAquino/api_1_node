const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
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
