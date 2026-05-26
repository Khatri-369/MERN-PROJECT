import User from "../../model/UserModel.js";

export const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteuser = await User.findByIdAndDelete(id);

        if (!deleteuser) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        res.status(200).json({
            message: "USER DELETED"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};