import Cart from "../../model/CartModel.js";

export const ShowCart = async (req, res) => {
    try {
        const data = await Cart.find();

        if (data.length == 0) {
            return res.status(404).json({
                message: "CART DATA NOT FOUND"
            });
        }

        res.status(200).json({
            message: "CART DATA FOUND",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};