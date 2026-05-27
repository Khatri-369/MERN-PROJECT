import Order from "../../model/OrderModel.js";

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "ORDER NOT FOUND"
      });
    }

    res.status(200).json({
      message: "ORDER DELETED SUCCESSFULLY"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};