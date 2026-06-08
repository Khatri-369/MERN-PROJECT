import User from "../../model/UserModel.js";
import bcrypt from "bcrypt"; //WE ONLY USE BCRYPT IN BACKEND NOT FRONTEND   

export const CreateUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);

        const photoFilename = req.file ? req.file.filename : "";

        const usr = new User({
            ...req.body,
            password: hashpassword,
            photo: photoFilename
        });
        const ress = await usr.save();

        res.status(200).json(ress);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};