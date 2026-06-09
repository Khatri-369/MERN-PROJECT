import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

import { auth } from "../middleware/auth.js";
import User from "../model/UserModel.js";
import Cart from "../model/CartModel.js";
import Order from "../model/OrderModel.js";

dotenv.config();

const router = express.Router();


//CREATING RAZOR PAY INSTANCE
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

// CREATE RAZORPAY ORDER
router.post("/createorder", auth, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Please log in" });
        }

        // Fetch user's cart items to securely calculate total amount
        const cartItems = await Cart.find({ user_id: userId }).populate("product_id");
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const totalprice = cartItems.reduce((sum, item) => {
            return sum + (Number(item.product_id.price) * Number(item.quantity));
        }, 0);

        if (totalprice <= 0) {
            return res.status(400).json({ message: "Invalid order amount" });
        }

        const options = {
            amount: Math.round(totalprice * 100), // amount in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);

        //SEND RESPONSE TO FRONTEND
        res.status(200).json({
            order,
            key_id: process.env.KEY_ID
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// VERIFY PAYMENT & CREATE DB ORDER
router.post("/verify", auth, async (req, res) => {
    try {
        const userId = req.userId;
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, latitude, longitude, customAddress } = req.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing payment credentials" });
        }

        // Verify signature
        const hmac = crypto.createHmac("sha256", process.env.KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
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
                price: Number(item.product_id.price)
            };
        });

        // 4. Calculate total price
        const totalprice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // 5. Construct delivery address
        const deliveryaddress = customAddress || `${user.first_name} ${user.last_name}, ${user.city}, ${user.state} - ${user.pin_code}, Mobile: ${user.mobile_no}`;

        // 6. Create and save order
        const order = new Order({
            user: userId,
            items,
            totalprice,
            deliveryaddress,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            orderstatus: "Pending" // Match standard DB flow
        });
        await order.save();

        // 7. Clear the cart
        await Cart.deleteMany({ user_id: userId });

        res.status(201).json({
            message: "ORDER CREATED SUCCESSFULLY",
            orderId: order._id
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;