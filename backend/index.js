import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userroute from "./routes/UserRoutes.js";
import productroute from "./routes/ProductRoutes.js";
import cartroute from "./routes/CartRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("CONNECT TO MONGODB");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING...");
});


app.use("/user",userroute);  
app.use("/product",productroute); 
app.use("/cart",cartroute);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});