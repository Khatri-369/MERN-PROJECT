import express from "express";
import { CreateUser } from "../controller/user/CreateUser.js";
import { DeleteUser } from "../controller/user/DeleteUser.js";
import { ShowUser } from "../controller/user/ShowUser.js";
import { showUserId } from "../controller/user/showUserId.js";
import { showUserSearch } from "../controller/user/ShowUserSearch.js";
import { UpdateUser } from "../controller/user/UpdateUser.js";
const route = express.Router();

route.post("/createuser", CreateUser);
route.get("/showuser", ShowUser);
route.get("/showuser/:id", showUserId);
route.put("/updateuser/:id", UpdateUser);
route.delete("/deleteuser/:id", DeleteUser);
route.get("/searchuser", showUserSearch);

export default route;