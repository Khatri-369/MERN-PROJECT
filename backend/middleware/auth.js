import jwt from "jsonwebtoken";

export const auth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"PLEASE LOGIN FIRST"
        });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"INVALID TOKEN"
        });
    }
};