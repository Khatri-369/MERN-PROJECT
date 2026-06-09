import Order from "../../model/OrderModel.js";

export const showOrder = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ user: userId }).sort({ ordereddate: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};