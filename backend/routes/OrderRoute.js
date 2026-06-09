import express from "express";

import { createOrder } from "../controller/order/CreateOrder.js";
import { showOrder } from "../controller/order/ShowOrder.js";
import { showOrderById } from "../controller/order/ShowOrderById.js";
import { updateOrder } from "../controller/order/UpdateOrder.js";
import { deleteOrder } from "../controller/order/DeleteOrder.js";
import { searchOrder } from "../controller/order/SearchOrder.js";

import { auth } from "../middleware/auth.js";

const route = express.Router();

route.post("/createorder", auth, createOrder);

route.get("/showorder", auth, showOrder);

route.get("/showorderbyid/:id", auth, showOrderById);

route.put("/updateorder/:id", auth, updateOrder);

route.delete("/deleteorder/:id", auth, deleteOrder);

route.get("/searchorder", auth, searchOrder);

export default route;