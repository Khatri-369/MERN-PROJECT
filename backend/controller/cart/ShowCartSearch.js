import Cart from "../../model/CartModel.js";

export const ShowCartSearch = async (req, res) => {
    try {
        const text = req.query.search;

        const cart = await Cart.find({
            user_id: new RegExp(text, "i")
        });

        if (cart.length == 0) {
            return res.status(404).json({
                message: "CART NOT FOUND"
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};