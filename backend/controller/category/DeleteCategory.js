import Category from "../../model/CategoryModel.js";

export const DeleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "CATEGORY NOT FOUND"
            });
        }

        res.status(200).json({
            message: "CATEGORY DELETED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};