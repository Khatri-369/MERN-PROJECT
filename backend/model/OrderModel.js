import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
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
    type: String,
    required: true
  },

  orderstatus: {
    type: String,
    default: "Order Placed"
  },

  latitude: {
    type: Number
  },

  longitude: {
    type: Number
  },

  ordereddate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);