import express from "express";
import { getOrders, simulateOrder, updateOrderStatus } from "../controller/OrderController.js";
import { shopauth } from "../middleware/shopauth.js";

const route = express.Router();

route.get("/", shopauth, getOrders);
route.post("/simulate", shopauth, simulateOrder);
route.put("/status/:id", shopauth, updateOrderStatus);

export default route;
