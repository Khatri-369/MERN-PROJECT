import Cart from "../../model/CartModel.js";

export const UpdateCart = async (req, res) => {
    try {
        const id = req.params.id;

        const updateCart = await Cart.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updateCart) {
            return res.status(404).json({
                message: "CART NOT FOUND"
            });
        }

        res.status(200).json(updateCart);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};