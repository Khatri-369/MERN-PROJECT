import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  vendorname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Vendor", vendorSchema);