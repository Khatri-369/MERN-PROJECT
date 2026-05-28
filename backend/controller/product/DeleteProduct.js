import Product from "../../model/ProductModel.js";

export const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json({
            message: "PRODUCT DELETED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};