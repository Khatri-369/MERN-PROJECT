import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("Shop", ShopSchema);