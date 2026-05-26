import Product from "../../model/ProductModel.js";

export const ShowProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const Products = await Product.findById(id);

        if (!Products) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json({
            message: "PRODUCT FOUND",
            data: Products
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};