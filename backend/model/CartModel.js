import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true,
        maxlength: 50
    },

    cart_status: {
        type: Number,
        default: 1
    },

    cdate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Cart", cartschema);