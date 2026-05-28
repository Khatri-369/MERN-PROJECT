import Product from "../../model/ProductModel.js";

export const ShowProduct = async (req, res) => {
    try {
        const product = await Product.find();

        if (!product.length) {
            return res.status(404).json({
                message: "NO PRODUCTS FOUND"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};