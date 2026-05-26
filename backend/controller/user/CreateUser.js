import User from "../../model/UserModel.js";

export const CreateUser = async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            msg: "USER CREATED SUCCESSFULLY",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};