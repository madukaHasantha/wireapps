var Router = require("express");
var customerRecordsController = require('./customerRecords.controller.js');

const routes = new Router();

routes.post("/add_customerRecord", customerRecordsController.addCustomerRecord);
routes.get("/get_all_customer_records", customerRecordsController.getAllCustomerRecords);
routes.get("/get_customer_recods_byID", customerRecordsController.getCustomerRecodsByID);
routes.patch("/update_customer_recods", customerRecordsController.updateCustomerRecodes);
routes.patch("/customer_recods_soft_delete", customerRecordsController.customerRecodsSoftDelete);
routes.delete("/delete_customer_recods", customerRecordsController.deleteCustomerRecods);
// routes.post("/login_user", userController.loginUser);



module.exports = routes;