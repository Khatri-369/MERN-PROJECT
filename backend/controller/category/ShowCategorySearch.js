import Category from "../../model/CategoryModel.js";

export const ShowCategorySearch = async (req, res) => {
    try {
        const text = req.query.search;

        const category = await Category.find({
            catname: new RegExp(text, "i")
        });

        if (!category.length) {
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