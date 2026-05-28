import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminid: {
        type: Number
    },
    fullname: {
        type: String,
        required: true,
        maxlength: 50
    },
    username: {
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
    emailid: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    mobileno: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        maxlength: 250
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

export default mongoose.model("Admin", adminSchema);