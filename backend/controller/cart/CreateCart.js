import Cart from "../../model/CartModel.js";

export const CreateCart = async (req, res) => {
    try {
        const Cartt = new Cart(req.body);

        await Cartt.save();

        res.status(201).json({
            msg: "Cart CREATED SUCCESSFULLY",
            data: Cartt
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};