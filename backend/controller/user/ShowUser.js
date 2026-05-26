import User from "../../model/UserModel.js";

export const ShowUser = async(req,res)=>{
try{
    const data = await User.find();

    if(data.length==0){
        return res.status(404).json({
            message: ("USER DTATA NOT FOUND")
        });
    }
    res.status(200).json({
        message:("USER DATA FOUND"),
        data : data
    });
}
catch(error){
    res.status(500).json({
            error: error.message
    });
}
};