import express from "express";

import { createVendor } from "../controller/vendor/CreateVendor.js";
import { showVendor } from "../controller/vendor/ShowVendor.js";
import { ShowVendorById } from "../controller/vendor/ShowVendorById.js";
import { updateVendor } from "../controller/vendor/UpdateVendor.js";
import { deleteVendor } from "../controller/vendor/DeleteVendor.js";
import { searchVendor } from "../controller/vendor/SearchVendor.js";

const route = express.Router();

route.post("/createvendor", createVendor);

route.get("/showvendor", showVendor);

route.get("/showvendorbyid/:id", ShowVendorById);

route.put("/updatevendor/:id", updateVendor);

route.delete("/deletevendor/:id", deleteVendor);

route.get("/searchvendor", searchVendor);

export default route;