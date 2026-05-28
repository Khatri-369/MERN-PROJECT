import Admin from "../../model/AdminModel.js";

export const showAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();

        if (admins.length===0) {
            return res.status(404).json({
                message: "NO ADMINS FOUND"
            });
        }

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};