import mongoose from "mongoose";

const schema = new mongoose.Schema({
    otp: { type: Number },
    otpExpire: { type: Date }
});

const Model = mongoose.model("Test", schema);

async function run() {
    try {
        const doc = new Model({ otp: "", otpExpire: "" });
        console.log("doc.otp:", doc.otp);
        console.log("doc.otp type:", typeof doc.otp);
        console.log("doc.otpExpire:", doc.otpExpire);
    } catch (e) {
        console.log("Error:", e.message);
    }
    process.exit(0);
}

run();
