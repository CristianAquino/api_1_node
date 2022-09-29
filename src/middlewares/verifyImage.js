const path = require("path");

function verifyImageFolder(req, res, next) {
  let extension = [".jpg", ".jpeg", ".png", ".webp"];
  if (!req.files)
    return res.status(404).json({ message: "necesita enviar una imagen" });

  const { image } = req.files;

  let ext = path.extname(image.name);
  if (!extension.includes(ext))
    return res
      .status(404)
      .json({ message: `el archivo ${image.name} no esta permitido` });

  next();
}
function verifyImagesChapter(req, res, next) {
  let extension = [".jpg", ".jpeg", ".png", ".webp"];
  if (!req.files)
    return res.status(404).json({ message: "necesita enviar una imagen" });

  const { image } = req.files;

  if (image.length >= 2) {
    for (img of image) {
      let ext = path.extname(img.name);
      if (!extension.includes(ext))
        return res
          .status(404)
          .json({ message: `el archivo ${img.name} no esta permitido` });
    }
  } else {
    let ext = path.extname(image.name);
    if (!extension.includes(ext))
      return res
        .status(404)
        .json({ message: `el archivo ${image.name} no esta permitido` });
  }
  next();
}

module.exports = { verifyImageFolder, verifyImagesChapter };
