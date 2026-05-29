import User from "../../model/UserModel.js";

export const verifyOTP = async (req, res) => {

    try {

        const {email_id,otp} = req.body;

        const user = await User.findOne({
            email_id
        });

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        if (user.otp !== Number(otp)) {

            return res.status(400).json({
                message: "Invalid OTP"
            });

        }

        if (user.otpExpire < Date.now()) {

            return res.status(400).json({
                message: "OTP Expired"
            });

        }

        res.status(200).json({
            message: "OTP Verified"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};