import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: String
    },
    customerName: { // Fallback/used for simulation
        type: String,
        trim: true
    },
    items: [
        {
            product: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shop"
            }
        }
    ],
    totalprice: {
        type: Number,
        required: true
    },
    deliveryaddress: {
        type: String
    },
    orderstatus: {
        type: String,
        default: "Pending"
    },
    ordereddate: {
        type: Date,
        default: Date.now
    }
});

// Reuse or export model
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
