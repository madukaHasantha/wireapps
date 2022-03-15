var Router = require("express");
var customerController = require("./customer.controller.js");

const routes = new Router();

routes.post("/add_customer", customerController.addCustomer);
routes.get("/get_all_customer", customerController.getAllCustomer);
routes.get("/get_customer_byID", customerController.getCustomerByID);
routes.patch("/update_customer", customerController.updateCustomer);
routes.patch("/customer_soft_delete", customerController.customerSoftDelete);
routes.delete("/delete_customer", customerController.deleteCustomer);

module.exports = routes;
