import Product from "../../model/ProductModel.js";

export const ShowProductBySearch = async (req, res) => {
    try {
        const text = req.query.search;
        const Product = await Product.find({
            name : new RegExp(text,"i")
        });

        if (Product.length==0) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json({
            message: "PRODUCT FOUND",
            data: Product
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};