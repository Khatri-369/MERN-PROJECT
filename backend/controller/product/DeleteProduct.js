import Product from "../../model/ProductModel.js";

export const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteproduct = await User.findByIdAndDelete(id);

        if (!deleteuser) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        res.status(200).json({
            message: "PRODUCT DELETED"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};