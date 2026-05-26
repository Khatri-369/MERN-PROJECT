import mongoose from "mongoose";
import User from "../../model/UserModel.js";

export const ShowBySearch = async (req, res) => {
    try {
        const text = req.query.search;
        const user = await User.find({
            name : new RegExp(text,"i")
        });

        if (user.length==0) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        res.status(200).json({
            message: "USER FOUND",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};