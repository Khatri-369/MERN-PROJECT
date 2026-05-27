import Order from "../../model/OrderModel.js";

export const showOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};