import Admin from "../../model/AdminModel.js";

export const ShowAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();

        res.status(200).json(admins);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};