import User from "../../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginUser = async(req,res)=>{
try{
    const user = await User.findOne({
        email_id : req.body.email_id
    });

    if (!user) {
    return res.status(404).json({
        message: "USER NOT FOUND"
    });
    }

    //SYNTAX :
    //bcrypt.compare(plainPassword, hashedPassword)
    const realpassword =  await bcrypt.compare(req.body.password,user.password);

    if(!realpassword){
        return res.status(401).json({
            message:"USER NOT FOUND"
        });
    }

    const token = jwt.sign(
        {
            userId:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    );

    //SYNTAX : RES.COOKIES("NAME",VALUE,OPTIONS)
    res.cookie("token",token,{
        httpOnly : true, //This prevents JavaScript running in the browser from reading the cookie.
        maxAge : 24*60*60*1000,
        sameSite: "none",
        secure: true
    }
    );

    res.status(200).json({
        message:"SIGN IN SUCCESSFULL"
    });
}
catch(error){
    res.status(500).json({
        message : error.message    
    });
}
}