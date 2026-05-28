import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
    catname: {
        type: String,
        required: true,
        maxlength: 50
    },

    cdate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Category", categoryschema);