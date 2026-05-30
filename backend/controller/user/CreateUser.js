import User from "../../model/UserModel.js";
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
    try {
       const user = req.body;

       const hashpassword = await bcrypt.hash(user.password,10);
       user.password = hashpassword;

        const usr = new User(user);
        const ress = await usr.save();

        res.status(200).json(ress);

    } catch (error) {
        if (error.code === 11000) {
            const key = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${key} already exists!` });
        }
        res.status(500).json({
            error: error.message
        });
    }
};