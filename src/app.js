// imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const createRoles = require("./libs/initialSetup");

const infoRouter = require("./routes/info.routes");
const productsRouter = require("./routes/products.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const folderRouter = require("./routes/folder.routes");
const chapterRouter = require("./routes/chapter.routes");
const searchRouter = require("./routes/search.routes");

const handleErrors = require("./middlewares/handleErrors");

const app = express();
createRoles();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api", infoRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/folders", folderRouter);
app.use("/api/chapters", chapterRouter);
app.use("/api/search", searchRouter);
app.use(handleErrors);

// exports
module.exports = app;
