const formValidate = (schema) => async (req, res, next) => {
  const { body } = req;
  try {
    await schema.validate(body);
  } catch (error) {
    return next(error);
  }
  next();
};
module.exports = { formValidate };
