import express from "express";
import { createAdmin } from "../controller/admin/CreateAdmin.js";
import { showAdmin } from "../controller/admin/ShowAdmin.js";
import { showAdminById } from "../controller/admin/ShowAdminId.js";
import { updateAdmin } from "../controller/admin/UpdateAdmin.js";
import { deleteAdmin } from "../controller/admin/DeleteAdmin.js";
import { searchAdmin } from "../controller/admin/SearchAdmin.js";

const route = express.Router();

route.post("/createadmin", createAdmin);
route.get("/showadmin", showAdmin);
route.get("/showadmin/:id", showAdminById);
route.put("/updateadmin/:id", updateAdmin);
route.delete("/deleteadmin/:id", deleteAdmin);
route.get("/searchadmin", searchAdmin);

export default route;