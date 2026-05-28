import Admin from "../../model/AdminModel.js";

export const searchAdmin = async (req, res) => {
    try {
        const text = req.query.search;

        const admins = await Admin.find({
            fullname: new RegExp(text, "i")
        });

        if (!admins.length) {
            return res.status(404).json({
                message: "ADMIN NOT FOUND"
            });
        }

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};