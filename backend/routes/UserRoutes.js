import express from "express";
import { CreateUser } from "../controller/user/CreateUser.js";
import { ShowUser } from "../controller/user/ShowUser.js";
import { ShowUserId } from "../controller/user/ShowUserId.js";
import { ShowBySearch } from "../controller/user/ShowUserSearch.js";
import { UpdateUser } from "../controller/user/UpdateUser.js";
import { DeleteUser } from "../controller/user/DeleteUser.js";
const router = express.Router();

router.post("/createuser", CreateUser);
router.get("/showuser", ShowUser);
router.get("/showuserbyid/:id",ShowUserId);
router.get("/showuserbysearch",ShowBySearch);
router.put("/updateuser/:id",UpdateUser);
router.delete("/deleteuser/:id",DeleteUser);

export default router;