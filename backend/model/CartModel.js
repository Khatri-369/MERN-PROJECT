import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    items:[
        {
            product:{
                type:String,
                required:true
            },
            quantity:{
                type:String,
                required:true
            },
            price: {
                type: String,
                required: true
            }
        }
    ],
    totalprice:{
        type:String,
        required:true
    }
});
export default mongoose.model("Cart", cartschema);