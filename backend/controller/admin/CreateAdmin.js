import Admin from "../../model/AdminModel.js";

export const CreateAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();

        res.status(201).json({
            message: "ADMIN CREATED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};