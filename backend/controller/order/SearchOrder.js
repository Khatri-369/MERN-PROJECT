import Order from "../../model/OrderModel.js";

export const searchOrder = async (req, res) => {
  try {
    const text = req.query.search;

    const order = await Order.find({
      user: new RegExp(text, "i")
    });

    if (order.length === 0) {
      return res.status(404).json({
        message: "ORDER NOT FOUND"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};