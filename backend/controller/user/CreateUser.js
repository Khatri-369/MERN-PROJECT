import User from "../../model/UserModel.js";
import bcrypt from "bcrypt"; //WE ONLY USE BCRYPT IN BACKEND NOT FRONTEND   

export const CreateUser = async (req, res) => {
    try {
       const user = req.body;

       //BCRYPT SYNTAX : bcrypt.hash(plainPassword, saltRounds)
       const hashpassword = await bcrypt.hash(user.password,10);
       user.password = hashpassword;

        const usr = new User(user); //MAKE NEW MONGOOSE DOCUMENT USING MODEL
        const ress = await usr.save();

        res.status(200).json(ress);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};