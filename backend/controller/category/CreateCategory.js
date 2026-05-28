import Category from "../../model/CategoryModel.js";

export const CreateCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();

        res.status(201).json(savedCategory);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};