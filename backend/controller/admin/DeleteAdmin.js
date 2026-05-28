import Admin from "../../model/AdminModel.js";

export const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);

        if (!admin) {
            return res.status(404).json({
                message: "ADMIN NOT FOUND"
            });
        }

        res.status(200).json({
            message: "ADMIN DELETED SUCCESSFULLY"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};