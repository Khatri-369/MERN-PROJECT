import express from "express";
import { CreateUser } from "../controller/user/CreateUser.js";
import { DeleteUser } from "../controller/user/DeleteUser.js";
import { ShowUser } from "../controller/user/ShowUser.js";
import { showUserId } from "../controller/user/showUserId.js";
import { showUserSearch } from "../controller/user/ShowUserSearch.js";
import { UpdateUser } from "../controller/user/UpdateUser.js";
import {forgotPassword} from "../controller/user/forgotpassword.js";
import {verifyOTP} from "../controller/user/VerifyOtp.js";
import {resetPassword} from "../controller/user/resetPassword.js";

const route = express.Router();

route.post("/createuser", CreateUser);
route.get("/showuser", ShowUser);
route.get("/showuser/:id", showUserId);
route.put("/updateuser/:id", UpdateUser);
route.delete("/deleteuser/:id", DeleteUser);
route.get("/searchuser", showUserSearch);

route.post("/forgotpassword",forgotPassword);
route.post("/verifyotp",verifyOTP);
route.post("/resetpassword",resetPassword);

export default route;