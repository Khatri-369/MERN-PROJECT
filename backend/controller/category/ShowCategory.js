import Category from "../../model/CategoryModel.js";

export const ShowCategory = async (req, res) => {
    try {
        const category = await Category.find();

        if (!category.length) {
            return res.status(404).json({
                message: "NO CATEGORY FOUND"
            });
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};