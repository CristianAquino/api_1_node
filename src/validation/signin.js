const yup = require("yup");

const signinSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

module.exports = signinSchema;
