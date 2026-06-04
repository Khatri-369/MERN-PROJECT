import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userroute from "./routes/UserRoutes.js";
import productroute from "./routes/ProductRoutes.js";
import cartroute from "./routes/CartRoutes.js";
import adminroute from "./routes/AdminRoute.js";
import vendorroute from "./routes/VendorRoute.js";
import orderroute from "./routes/OrderRoute.js";
import categoryroute from "./routes/CategoryRoute.js";
import cookieParser from "cookie-parser";

import { auth } from "./middleware/auth.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({
    origin: "http://localhost:3000", // React URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("CONNECT TO MONGODB");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/me", auth, (req, res) => {
    res.json({
        userId: req.userId
    });
});

app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING...");
});

app.use("/user", userroute);
app.use("/product", productroute);
app.use("/cart", cartroute);
app.use("/admin", adminroute);
app.use("/vendor", vendorroute);
app.use("/order", orderroute);
app.use("/category", categoryroute);

app.use("/uploads", express.static("uploads")); 

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});