import Cart from "../../model/CartModel.js";

export const ShowCartId = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json({
                message: "CART NOT FOUND"
            });
        }

        res.status(200).json({
            message: "CART FOUND",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};