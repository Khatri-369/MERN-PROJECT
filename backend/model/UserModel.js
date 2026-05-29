import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 50
    },

    last_name: {
        type: String,
        required: true,
        maxlength: 50
    },

    user_name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },

    password: {
        type: String,
        required: true,
        maxlength: 50
    },

    email_id: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },

    mobile_no: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true,
        maxlength: 20
    },

    state: {
        type: String,
        required: true,
        maxlength: 20
    },

    pin_code: {
        type: String,
        required: true
    },

    otp: {
    type: Number
    },

    otpExpire: {
    type: Date
    },

    status: {
        type: Number,
        default: 1
    },

    cdate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("User", userschema);