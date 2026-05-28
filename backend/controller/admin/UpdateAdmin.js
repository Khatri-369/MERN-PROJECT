import Admin from "../../model/AdminModel.js";

export const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!admin) {
            return res.status(404).json({
                message: "ADMIN NOT FOUND"
            });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};