import Admin from "../../model/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginAdmin = async(req,res)=>{
try{
    const admin = await Admin.findOne({
        emailid : req.body.email_id
    });

    if (!admin) {
    return res.status(404).json({
        message: "ADMIN NOT FOUND"
    });
    }

    //SYNTAX :
    //bcrypt.compare(plainPassword, hashedPassword)
    const realpassword =  await bcrypt.compare(req.body.password,admin.password);

    if(!realpassword){
        return res.status(401).json({
            message:"PASSWORD INCORRECT...!"
        });
    }

    const token = jwt.sign(
        {
            userId:admin._id
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
        sameSite: "lax",
        secure: false
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