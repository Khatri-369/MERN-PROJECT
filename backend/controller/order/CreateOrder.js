import Order from "../../model/OrderModel.js";
import User from "../../model/UserModel.js";
import Cart from "../../model/CartModel.js";
import Product from "../../model/ProductModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    // 1. Fetch user data to build delivery address
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Fetch user's cart items
    const cartItems = await Cart.find({ user_id: userId }).populate("product_id");
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // 3. Map cart items to order schema items structure
    const items = cartItems.map(item => {
      if (!item.product_id) {
        throw new Error("One or more products in your cart no longer exist");
      }
      return {
        product: item.product_id.productname,
        quantity: Number(item.quantity),
        price: Number(item.product_id.price),
        shopId: item.product_id.shopId
      };
    });

    // 4. Calculate total price
    const totalprice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 5. Construct delivery address
    const { latitude, longitude, customAddress } = req.body;
    const deliveryaddress = customAddress || `${user.first_name} ${user.last_name}, ${user.city}, ${user.state} - ${user.pin_code}, Mobile: ${user.mobile_no}`;

    // 6. Create and save order
    const order = new Order({
      user: userId,
      items,
      totalprice,
      deliveryaddress,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      orderstatus: "Pending"
    });
    await order.save();

    // 7. Clear the cart
    await Cart.deleteMany({ user_id: userId });

    res.status(201).json({
      message: "ORDER CREATED SUCCESSFULLY",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};