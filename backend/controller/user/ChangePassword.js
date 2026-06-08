import User from "../../model/UserModel.js";
import bcrypt from "bcrypt"; //WE ONLY USE BCRYPT IN BACKEND NOT FRONTEND   

export const ChangePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword, confirmnewpassword } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }
        //BCRYPT SYNTAX : bcrypt.compare(plainpassword,hashedpassword);
        const isMatchedpassword = await bcrypt.compare(oldpassword, user.password);
        if (isMatchedpassword) {
            if (newpassword != confirmnewpassword) {
                return res.status(401).json({
                    message: "PASSWORD DO NOT MATCH"
                });
            }

            const hashedpassword = await bcrypt.hash(newpassword, 10);
            user.password = hashedpassword;
            await user.save();
            return res.status(200).json({
                message: "PASSWORD CHANGED SUCCESSFULLY"
            });
        }
        else {
            return res.status(401).json({
                message: "INVALID PASSWORD"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}