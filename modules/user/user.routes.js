var Router = require("express");
var userController = require("./user.controller.js");

const routes = new Router();

routes.post("/add_user", userController.addUser);
routes.post("/login_user", userController.loginUser);
routes.get("/get_all_users", userController.getAllUsers);
routes.get("/get_user_byID", userController.getUserByID);

module.exports = routes;
