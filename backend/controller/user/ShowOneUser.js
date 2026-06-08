import User from "../../model/UserModel.js";

export const ShowOneUser = async (req, res) => {
    try {
        const data = await User.findById(req.userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};