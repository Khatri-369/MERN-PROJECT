import Admin from "../../model/AdminModel.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            ...req.body,
            password: hashedPassword
        });
        const savedAdmin = await admin.save();

        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};