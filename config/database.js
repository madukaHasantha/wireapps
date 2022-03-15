var sqlite3 = require("sqlite3").verbose();
var constants = require("./constant.js");
var md5 = require("md5");

let db = new sqlite3.Database(constants.DBSOURCE, async (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to the sqlite database");

    await db.run(constants.CREATE_MEDICINE_TABLE, (err) => {
      if (err) {
        console.log("Medicine table is already created");
      }
    });

    await db.run(constants.CREATE_CUSTOMER_TABLE, (err) => {
      if (err) {
        console.log("Customer table is already created");
      }
    });

    await db.run(constants.CREATE_USER_TABLE, (err) => {
      if (err) {
        console.log("user table is already created");
      }
    });

    await db.run(constants.CREATE_CUSTOMERRECORD_TABLE, (err) => {
      if (err) {
        console.log("Customer record table is already created");
      }
    });
  }
});

module.exports = db;
