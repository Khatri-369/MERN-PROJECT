import Product from "../../model/ProductModel.js";

export const UpdateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};