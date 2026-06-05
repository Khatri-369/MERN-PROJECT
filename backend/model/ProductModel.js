import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        maxlength: 50
    },

    modelnumber: {
        type: String,
        required: true,
        maxlength: 50
    },

    modelyear: {
        type: Number,
        required: true
    },

    productphoto: {
        type: [String],
        required: true,
        maxlength: 250
    },

    brandname: {
        type: String,
        required: true,
        maxlength: 50
    },

    categoryname: {
        type: String,
        required: true,
        maxlength: 50
    },

    color: {
        type: String,
        required: true,
        maxlength: 50
    },

    weight: {
        type: String,
        required: true,
        maxlength: 50
    },

    includedcomponent: {
        type: String,
        required: true,
        maxlength: 50
    },

    warranty: {
        type: String,
        required: true,
        maxlength: 50
    }
});

export default mongoose.model("Product", productschema);