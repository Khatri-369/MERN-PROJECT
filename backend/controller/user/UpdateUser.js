import User from "../../model/UserModel.js";

export const UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});

        if (!updatedUser) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        res.status(200).json({
            message: "USER UPDATED",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};