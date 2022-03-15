var db = require("../../config/database.js");
var constants = require("../../config/constant.js");
var userValidation = require("./user.validation.js");
const bcrypt = require("bcrypt");

module.exports.addUser = async (req, res) => {
  try {
    if (
      req.body.userID.length != 0 &&
      req.body.name.length != 0 &&
      req.body.age.length != 0 &&
      req.body.contactNumber.length != 0 &&
      req.body.email.length != 0 &&
      req.body.password.length != 0 &&
      req.body.role.length != 0
    ) {
      var errors = [];
      await db.all(
        constants.GET_USER_BY_EMAIL,
        [req.body.email],
        (err, result) => {
          if (result.length != 0) {
            return res.status(400).json({ message: "Email is alredy exist " });
          } else {
            const data = {
              userID: req.body.userID,
              name: req.body.name,
              age: req.body.age,
              contactNumber: req.body.contactNumber,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
            };
            console.log("data", data);
            var errors = userValidation.validateFields(data);
            console.log(errors);
            if (errors.length == 0) {
              var params = [
                data.userID,
                data.name,
                data.age,
                data.contactNumber,
                data.email,
                bcrypt.hashSync(data.password, 10),
                data.role,
              ];
              console.log(params);
              db.run(constants.ADD_USER, params, (err, result) => {
                if (err) {
                  return res.status(400).json({ error: err.message });
                } else {
                  console.log(params);
                  return res.status(200).json({
                    message: "A user sucessfully added!",
                    data: data,
                  });
                }
              });
            } else {
              return res.status(400).json({
                message: errors[0],
              });
            }
          }
        }
      );
    } else {
      return res.status(400).json({
        message: "please enter all the fieds and try again!",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    var data = {};

    await db.all(constants.GET_USER_BY_EMAIL, [email], (err, result) => {
      console.log(result.length);
      if (result.length != 0) {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          data = result[0];
          if (bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(200).json({
              message: "A user sucessfully loged!",
              name: data.name,
              role: data.role,
            });
          } else {
            return res.status(400).json({
              message: "Wrong Password!",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: "you are not a user!",
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    var params = [];

    await db.all(constants.GET_ALL_USERS, params, (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(200).json({
          message: "Success",
          data: rows,
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getUserByID = async (req, res) => {
  try {
    const userID = req.body.userID;
    var data = {};

    await db.all(constants.GET_USER_BY_ID, [userID], (err, rows) => {
      if (rows.length != 0) {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Successfully got a user details",
            data: rows,
          });
        }
      } else {
        return res.status(400).json({
          message: "There is no any user in this user id",
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};
