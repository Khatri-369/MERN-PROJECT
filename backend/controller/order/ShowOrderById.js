import Order from "../../model/OrderModel.js";

export const showOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
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