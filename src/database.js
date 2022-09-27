require("dotenv").config();
const mongoose = require("mongoose");
const { DATA_BASE_URI } = process.env;

mongoose
  .connect(DATA_BASE_URI)
  .then(() => console.log("conectado"))
  .catch((error) => console.error(error));
