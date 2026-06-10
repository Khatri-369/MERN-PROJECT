import { urlencoded } from "express";
import app from "./index.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import shoproute from "./routes/shoproute.js";
import orderroute from "./routes/orderroute.js";
import productroute from "./routes/productroute.js";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

app.use("/shop", shoproute);
app.use("/order", orderroute);
app.use("/product", productroute);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../backend/uploads")));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MONGO DB CONNECTED SUCCESSFULLY");
}).catch((error) => {
    console.log("MONGODB ERROR OCCURED");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});