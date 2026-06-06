import Cart from "../../model/CartModel.js";

export const ShowOneCart = async (req, res) => {
    try {
        const data = await Cart.find({ user_id: req.userId }).populate("product_id");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};