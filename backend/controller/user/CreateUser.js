import User from "../../model/UserModel.js";

export const CreateUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        if (error.code === 11000) {
            const key = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${key} already exists!` });
        }
        res.status(500).json({
            error: error.message
        });
    }
};