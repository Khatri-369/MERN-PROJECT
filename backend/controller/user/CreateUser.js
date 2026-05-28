import User from "../../model/UserModel.js";

export const CreateUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};