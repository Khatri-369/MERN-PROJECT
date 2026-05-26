import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: [String],    //WE CAN ALSO TAKE ARRAY AS TYPE
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    reviewsCount: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    specifications: {
        type: String,
        required: true
    }
});

export default mongoose.model("Product", productschema);