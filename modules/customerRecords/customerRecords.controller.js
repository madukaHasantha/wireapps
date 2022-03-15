var db = require("../../config/database.js");
var constants = require("../../config/constant.js");

module.exports.addCustomerRecord = async (req, res) => {
  try {
    if (req.body.customerID.length != 0 && req.body.medicines.length != 0) {
      if (req.body.role == "ADMIN" || req.body.role == "admin") {
        var customerID = req.body.customerID;
        var medicinesArray = req.body.medicines;

        await db.all(
          constants.GET_CUSTOMER_RECORDS_BY_ID,
          [customerID],
          (err, result) => {
            
            if (result.length != 0) {
              return res
                .status(400)
                .json({ message: "This medicine is alredy exist " });
            } else {
              var params = [customerID, medicinesArray];
              db.run(constants.ADD_CUSTOMER_RECORD, params, (err, result) => {
                if (err) {
                  return res.status(400).json({
                    message: err.message,
                  });
                } else {
                  return res.status(200).json({
                    message: "Success added a customer recode!",
                    data: result,
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

module.exports.getAllCustomerRecords = async (req, res) => {
  try {
    await db.all(constants.GET_ALL_CUSTOMER_RECORDS, [], (err, rows) => {
      if ([rows].length != 0) {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        } else {
          return res.status(200).json({
            message: "Success!",
            data: rows,
          });
        }
      } else {
        return res.status(400).json({
          message: "There are no any customer recode!",
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getCustomerRecodsByID = async (req, res) => {
  try {
    const customerID = req.body.customerID;
    var data = {};
    await db.all(
      constants.GET_CUSTOMER_RECORDS_BY_ID,
      [customerID],
      (err, rows) => {
        if (rows.length != 0) {
          if (err) {
            return res.status(400).json({ error: err.message });
          } else {
            return res.status(200).json({
              message: "Success got a customerrecodes details",
              data: rows,
            });
          }
        } else {
          return res.status(400).json({
            message:
              "There is no any customer recode in this customer recode id to show!",
          });
        }
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.updateCustomerRecodes = async (req, res) => {
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
        constants.GET_CUSTOMER_RECODS_BY_ID,
        [customerID],
        (err, result) => {
          if (result.length != 0) {
            if (err) {
              return res.status(400).json({ error: err.message });
            } else {
              data = result[0];
              console.log(data);
              Object.keys(req.body).forEach((key) => {
                if (key != "customerID" && req.body[key] != data[key]) {
                  data[key] = req.body[key];
                }
              });

              console.log(customerID);
              var params = [customerID, data.medicines];
              db.run(
                constants.UPDATE_CUSTOMER_RECODS,
                params,
                (err, result) => {
                  console.log(result);
                  if (err) {
                    return res.status(400).json({ error: err.message });
                  } else {
                    return res.status(200).json({
                      message: "Customerrecods sucessfully updated!",

                      data: result,
                    });
                  }
                }
              );
            }
          } else {
            return res.status(400).json({
              message:
                "There is no any customer recode in this customer recode id to show!",
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

module.exports.customerRecodsSoftDelete = async (req, res) => {
  try {
    if (
      req.body.role == "ADMIN" ||
      req.body.role == "admin" ||
      req.body.role == "MANAGER" ||
      req.body.role == "manager"
    ) {
      const customerID = req.body.customerID;
      var params = [customerID];
      await db.run(
        constants.SOFT_DELETE_CUSTOMER_RECODS,
        params,
        (err, result) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          } else {
            return res.status(200).json({
              message: "Successfully deleted costomer!",
              changes: this.changes,
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

module.exports.deleteCustomerRecods = async (req, res) => {
  try {
    if (req.body.role == "ADMIN" || req.body.role == "admin") {
      const customerID = req.body.customerID;
      var params = [customerID];

      await db.run(constants.DELETE_CUSTOMER_RECODS, params, (err, result) => {
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
