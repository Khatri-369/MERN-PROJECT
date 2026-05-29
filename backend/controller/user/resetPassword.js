import User from "../../model/UserModel.js";

export const resetPassword = async (req, res) => {
    try {
        const { email_id, password } = req.body;

        const user = await User.findOne({
            email_id
        });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        user.password = password;

        user.otp = null;
        user.otpExpire = null;

        await user.save();

        res.status(200).json({
            message: "Password Reset Successful"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};