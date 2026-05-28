import Product from "../../model/ProductModel.js";

export const ShowProductSearch = async (req, res) => {
    try {
        const text = req.query.search;

        const product = await Product.find({
            productname: new RegExp(text, "i")
        });

        if (!product.length) {
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