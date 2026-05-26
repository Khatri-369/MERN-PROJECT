import mongoose from "mongoose";

const userschema  = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    phone:{
        type: String,
        required : true
    },
    profileImage:{
        type: String,
        required : true
    },
    address:{
        type: String,
        required : true
    },
    birthdate:{
        type:Date,
        required : true
    },
    gender:{
        type:String,
        required: true
    },
   cdate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("User",userschema);