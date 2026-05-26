import Cart from "../../model/CartModel.js";

export const DeleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        const deletecart = await Cart.findByIdAndDelete(id);

        if (!deletecart) {
            return res.status(404).json({
                message: "CART NOT FOUND"
            });
        }

        res.status(200).json({
            message: "CART DELETED"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};