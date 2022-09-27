const pkg = require("../../package.json");

function getInfoApi(req, res) {
  res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    license: pkg.license,
  });
}

module.exports = getInfoApi;
