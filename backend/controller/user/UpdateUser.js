import User from "../../model/UserModel.js";

export const UpdateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.photo = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!user) {
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