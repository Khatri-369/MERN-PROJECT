import Admin from "../../model/AdminModel.js";

export const createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        const savedAdmin = await admin.save();

        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};