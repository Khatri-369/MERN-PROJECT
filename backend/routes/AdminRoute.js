import express from "express";
import { createAdmin } from "../controller/admin/CreateAdmin.js";
import { showAdmin } from "../controller/admin/ShowAdmin.js";
import { showAdminById } from "../controller/admin/ShowAdminId.js";
import { updateAdmin } from "../controller/admin/UpdateAdmin.js";
import { deleteAdmin } from "../controller/admin/DeleteAdmin.js";
import { searchAdmin } from "../controller/admin/SearchAdmin.js";

import { LoginAdmin } from "../controller/admin/LoginAdmin.js";
import { auth } from "../middleware/auth.js";
import { LogoutAdmin } from "../controller/admin/LogOutAdmin.js";

import { upload } from "../middleware/multer.js";

const route = express.Router();

route.get("/adminpanel", auth, (req, res) => {
    res.json({
        user_id: req.userId
    });
});

route.post("/createadmin", upload.single("photo"), createAdmin);
route.get("/showadmin", auth, showAdmin);
route.get("/showadmin/:id", auth, showAdminById);
route.put("/updateadmin/:id", auth, updateAdmin);
route.delete("/deleteadmin/:id", auth, deleteAdmin);
route.get("/searchadmin", auth, searchAdmin);

route.post("/loginadmin", LoginAdmin);
route.post("/logoutadmin", LogoutAdmin);

export default route;