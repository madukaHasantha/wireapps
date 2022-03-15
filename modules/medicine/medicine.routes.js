var Router = require("express");
var medicineController = require('./medicine.controller.js');

const routes = new Router();

routes.post("/add_medicine", medicineController.addMedicine);
routes.get("/get_all_medicines", medicineController.getAllMedicines);
routes.get("/get_medicine_byID", medicineController.getMedicineByID);
routes.patch("/soft_delete", medicineController.softDelete);
routes.delete("/delete_medicine", medicineController.deleteMedicine);
routes.patch("/update_medicine", medicineController.updateMedicine);

module.exports = routes