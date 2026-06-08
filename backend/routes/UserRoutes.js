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
import { LoginUser } from "../controller/user/LoginUser.js";
import { ShowOneUser } from "../controller/user/ShowOneUser.js";
import {LogoutUser} from "../controller/user/LogoutUser.js";
 
import{auth} from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const route = express.Router();

route.get("/adminpanel",auth,(req,res)=>{
    res.json({
        userId : req.userId
    });
});

route.post("/createuser", upload.single("photo"), CreateUser);

route.get("/showuser",auth, ShowUser);

route.post("/logoutuser", LogoutUser);

route.get("/showuser/:id",auth, showUserId);
route.put("/updateuser/:id",auth, UpdateUser);
route.delete("/deleteuser/:id",auth, DeleteUser);
route.get("/searchuser",auth, showUserSearch);

route.get("/showoneuser",auth,ShowOneUser);

route.post("/loginuser",LoginUser);
route.post("/forgotpassword",forgotPassword);
route.post("/verifyotp",verifyOTP);
route.post("/resetpassword",resetPassword);


export default route;