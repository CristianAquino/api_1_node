function handleErrors(error, req, res, next) {
  console.log(error.name);
  res.status(404).json({ message: `${error.name}` });
}

module.exports = handleErrors;
