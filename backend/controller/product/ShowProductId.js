import Product from "../../model/ProductModel.js";

export const ShowProductId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

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