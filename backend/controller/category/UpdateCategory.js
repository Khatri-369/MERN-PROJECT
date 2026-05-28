import Category from "../../model/CategoryModel.js";

export const UpdateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

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