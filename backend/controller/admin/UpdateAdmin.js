import Admin from "../../model/AdminModel.js";

export const UpdateAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            message: "ADMIN UPDATED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};