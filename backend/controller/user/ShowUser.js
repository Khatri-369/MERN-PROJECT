import User from "../../model/UserModel.js";

export const ShowUser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({
                message: "NO USERS FOUND"
            });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};