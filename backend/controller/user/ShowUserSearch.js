import User from "../../model/UserModel.js";

export const showUserSearch = async (req, res) => {
    try {
        const text = req.query.search;

        const user = await User.find({
            first_name: new RegExp(text, "i")
        });

        if (!user.length) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};