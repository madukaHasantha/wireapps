const db = require("../../config/database");

module.exports.validateFields = (fields) => {
  var errors = [];
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  var validEmail = emailRegex.test(fields.email);
  var validPassword = passwordRegex.test(fields.password);

  if (!validEmail) {
    errors.push("Email is not valid");
    return errors;
  }

  if (!validPassword) {
    errors.push("password is not valid");
    return errors;
  }

  return errors;
};
