import Cart from "../../model/CartModel.js";

export const ShowOneProduct = async (req, res) => {
    try {
        const data = await Cart.find({ product_id: req.product_id,user_id:req.userId});

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};