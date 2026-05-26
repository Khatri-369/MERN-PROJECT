import Admin from "../../model/AdminModel.js";

export const DeleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "ADMIN DELETED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};