import Product from "../../model/ProductModel.js";

export const UpdateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(id,req.body,{new:true});

        if (!updateProduct) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json({
            message: "PRODUCT UPDATED",
            data: updateProduct
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};