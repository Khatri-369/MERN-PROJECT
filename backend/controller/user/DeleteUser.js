import User from "../../model/UserModel.js";

export const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        res.status(200).json({
            message: "USER DELETED SUCCESSFULLY"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};