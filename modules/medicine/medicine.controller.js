var db = require("../../config/database.js");
var constants = require("../../config/constant.js");

module.exports.getAllMedicines = async (req, res) => {
  try {
    var params = [];

    await db.all(constants.GET_ALL_MEDICINES, params, (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(200).json({
          message: "Successfully got all the details about medicine",
          data: rows,
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getMedicineByID = async (req, res) => {
  try {
    const medID = req.body.medID;
    var data = {};

    await db.all(constants.GET_MEDICINE_BY_ID, [medID], (err, rows) => {
      if (rows.length != 0) {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Successfully got a medicine details",
            data: rows,
          });
        }
      } else {
        return res.status(400).json({
          message: "There is no any medicin in this medicine id",
        });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.addMedicine = async (req, res) => {
  try {
    if (
      req.body.medID.length != 0 &&
      req.body.name.length != 0 &&
      req.body.description.length != 0 &&
      req.body.color.length != 0
    ) {
      if (req.body.role == "ADMIN" || req.body.role == "admin") {
        var errors = [];
        var data = {
          medID: req.body.medID,
          name: req.body.name,
          desc: req.body.description,
          color: req.body.color,
        };

        await db.all(
          constants.GET_MEDICINE_BY_ID,
          [data.medID],
          (err, result) => {
            
            if (result.length != 0) {
              return res
                .status(400)
                .json({ message: "This medicine is alredy exist " });
            } else {
              var params = [data.medID, data.name, data.desc, data.color];

              db.run(constants.ADD_MEDICINE, params, (err, result) => {
                if (err) {
                  return res.status(400).json({ error: err.message });
                } else {
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

module.exports.updateMedicine = async (req, res) => {
  try {
    if (
      req.body.role == "ADMIN" ||
      req.body.role == "admin" ||
      req.body.role == "MANAGER" ||
      req.body.role == "manager"
    ) {
      const medID = req.body.medID;
      var data = {};
      await db.all(constants.GET_MEDICINE_BY_ID, [medID], (err, result) => {
        if (result.length != 0) {
          if (err) {
            return res.status(400).json({ error: err.message });
          } else {
            data = result[0];
            Object.keys(req.body).forEach((key) => {
              if (key != "medID" && req.body[key] != data[key]) {
                data[key] = req.body[key];
              }
            });
            var params = [data.name, data.description, data.color, medID];
            db.run(constants.UPDATE_MEDICINE, params, (err, result) => {
              if (err) {
                return res.status(400).json({ error: err.message });
              } else {
                return res.status(200).json({
                  message: "Sucessfully updated!",
                  data: result,
                });
              }
            });
          }
        } else {
          return res.status(400).json({
            message: "There is no any medicin in this medicine id to update!",
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

module.exports.softDelete = async (req, res) => {
  try {
    if (
      req.body.role == "ADMIN" ||
      req.body.role == "admin" ||
      req.body.role == "MANAGER" ||
      req.body.role == "manager"
    ) {
      const medID = req.body.medID;
      var params = [medID];
      await db.run(constants.SOFT_DELETE_MEDICINE, params, (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Successfully deleted a medicine!",
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

module.exports.deleteMedicine = async (req, res) => {
  try {
    if (req.body.role == "ADMIN" || req.body.role == "admin") {
      const medID = req.body.medID;
      var params = [medID];

      await db.run(constants.DELETE_MEDICINE, params, (err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          return res.status(200).json({
            message: "Successfully deleted a medicine!",
            changes: this.changes,
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "You are not permited access to delete",
      });
    }
  } catch (e) {
    return res.status(400).json(e);
  }
};
