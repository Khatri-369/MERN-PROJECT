import Category from "../../model/CategoryModel.js";

export const ShowCategoryId = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "CATEGORY NOT FOUND"
            });
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};