import Admin from "../../model/AdminModel.js";

export const ShowAdminSearch = async (req, res) => {
    try {
        const text = req.query.search?.trim();

        if (!text) {
            return res.status(400).json({
                message: "SEARCH TEXT REQUIRED"
            });
        }

        const admins = await Admin.find({
            name: {
                $regex: text,
                $options: "i"
            }
        });

        if (admins.length === 0) {
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