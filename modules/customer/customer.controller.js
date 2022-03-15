var db = require("../../config/database.js");
var constants = require("../../config/constant.js");

module.exports.addCustomer = async (req, res) => {
  try {
    if (
      req.body.customerID.length != 0 &&
      req.body.name.length != 0 &&
      req.body.age.length != 0 &&
      req.body.contactNumber.length != 0 &&
      req.body.date.length != 0
    ) {
      if (req.body.role == "ADMIN" || req.body.role == "admin") {
        const role = req.body.role;
        var errors = [];
        var data = {
          customerID: req.body.customerID,
          name: req.body.name,
          age: req.body.age,
          contactNumber: req.body.contactNumber,
          date: req.body.date,
        };

        await db.all(
          constants.GET_CUSTOMER_BY_ID,
          [data.customerID],
          (err, result) => {
            console.log(result);
            if (result.length != 0) {
              return res
                .status(400)
                .json({ message: "This customer is alredy exist " });
            } else {
              var params = [
                data.customerID,
                data.name,
                data.age,
                data.contactNumber,
                data.date,
              ];

              db.run(constants.ADD_CUSTOMER, params, (err, result) => {
                if (err) {
                  return res.status(400).json({ error: err.message });
                } else {
                  console.log(params);
                  return res.status(200).json({
                    message: "Sucessfully added!",
                    data: data,
                  });
                }
              });
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "You have not permitted to this API endpoint!",
        });
      }
    } else {
      return res.status(400).json({
        message: "please enter all the fieds and try again!",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getAllCustomer = async (req, res) => {
  try {
    var params = [];

    await db.all(constants.GET_ALL_CUSTOMER, params, (err, rows) => {
      if (err) {
        console.log(rows);
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(200).json({
          message: "Success got all customer details",

          data: rows,
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getCustomerByID = async (req, res) => {
  try {
    const customerID = req.body.customerID;
    var data = {};

    await db.all(constants.GET_CUSTOMER_BY_ID, [customerID], (err, rows) => {
      if (rows.length != 0) {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Success got a customer details",
            data: rows,
          });
        }
      } else {
        return res.status(400).json({
          message: "There is no any user in this customer id",
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.updateCustomer = async (req, res) => {
  try {
    if (
      req.body.role == "ADMIN" ||
      req.body.role == "admin" ||
      req.body.role == "MANAGER" ||
      req.body.role == "manager"
    ) {
      const customerID = req.body.customerID;
      var data = {};
      await db.all(
        constants.GET_CUSTOMER_BY_ID,
        [customerID],
        (err, result) => {
          if (result.length != 0) {
            if (err) {
              return res.status(400).json({ error: err.message });
            } else {
              data = result[0];
              
              Object.keys(req.body).forEach((key) => {
                if (key != "customerID" && req.body[key] != data[key]) {
                  data[key] = req.body[key];
                }
              });

              
              var params = [
                data.customerID,
                data.name,
                data.age,
                data.contactNumber,
                data.date,
                data.customerID,
              ];
              db.run(constants.UPDATE_CUSTOMER, params, (err, result) => {
                if (err) {
                  return res.status(400).json({ error: err.message });
                } else {
                  return res.status(200).json({
                    message: "Customer sucessfully updated!",
                    data: result,
                  });
                }
              });
            }
          } else {
            return res.status(400).json({
              message: "There is no any customer in this id to update",
            });
          }
        }
      );
    } else {
      return res.status(400).json({
        message: "You have not permitted to this API endpoint!",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.customerSoftDelete = async (req, res) => {
  try {
    if (
      req.body.role == "ADMIN" ||
      req.body.role == "admin" ||
      req.body.role == "MANAGER" ||
      req.body.role == "manager"
    ) {
      const customerID = req.body.customerID;
      var params = [customerID];

      await db.run(constants.SOFT_DELETE_CUSTOMER, params, (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Successfully deleted costomer!",
            changes: this.changes,
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "You have not permitted to this API endpoint!",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.deleteCustomer = async (req, res) => {
  try {
    if (req.body.role == "ADMIN" || req.body.role == "admin") {
      const customerID = req.body.customerID;
      var params = [customerID];

      await db.run(constants.DELETE_CUSTOMER, params, (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Success!",
            changes: this.changes,
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "You have not permitted to this API endpoint!",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};
