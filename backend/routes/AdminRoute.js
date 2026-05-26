import express from "express";

import { CreateAdmin } from "../controller/admin/CreateAdmin.js";
import { ShowAdmin } from "../controller/admin/ShowAdmin.js";
import { ShowAdminId } from "../controller/admin/ShowAdminId.js";
import { ShowAdminSearch } from "../controller/admin/ShowAdminSearch.js";
import { DeleteAdmin } from "../controller/admin/DeleteAdmin.js";
import { UpdateAdmin } from "../controller/admin/UpdateAdmin.js";

const router = express.Router();

router.post("/createadmin", CreateAdmin);

router.get("/showadmin", ShowAdmin);

router.get("/showadminid/:id", ShowAdminId);

router.get("/showadminsearch", ShowAdminSearch);

router.delete("/deleteadmin/:id", DeleteAdmin);

router.put("/updateadmin/:id", UpdateAdmin);

export default router;