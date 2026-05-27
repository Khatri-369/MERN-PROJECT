import Order from "../../model/OrderModel.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "ORDER CREATED SUCCESSFULLY"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};