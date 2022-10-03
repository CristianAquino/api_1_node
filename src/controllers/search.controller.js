const Folder = require("../models/Folder");

function search(req, res, next) {
  const search = req.query.search;
  const page = req.query.page || 1;
  if (!search) {
    return res
      .status(200)
      .json({ message: "no ingreso el nombre del folder a buscar" });
  }
  Folder.paginate({ $text: { $search: search } }, { page })
    .then((folder) => {
      if (folder.docs.length == 0) {
        return res
          .status(404)
          .json({ message: "no se econtraron elementos para esta busqueda" });
      }
      return res.status(200).json(folder);
    })
    .catch((error) => next(error));
}

module.exports = search;
