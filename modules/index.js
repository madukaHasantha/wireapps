var medicineRoutes = require("./medicine/medicine.routes.js");
var customerRoutes = require("./customer/customer.routes.js");
var userRoutes = require("./user/user.routes.js");
var customerRecords = require("./customerRecords/customerRecords.routes");

module.exports = function (app) {
  app.use("/api/wireapps/medicineRoutes", medicineRoutes),
    app.use("/api/wireapps/customerRoutes", customerRoutes),
    app.use("/api/wireapps/userRoutes", userRoutes),
    app.use("/api/wireapps/customerRecordsRoutes", customerRecords);
};
