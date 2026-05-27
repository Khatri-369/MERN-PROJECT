import express from "express";

import { createOrder } from "../controller/order/CreateOrder.js";
import { showOrder } from "../controller/order/ShowOrder.js";
import { showOrderById } from "../controller/order/ShowOrderById.js";
import { updateOrder } from "../controller/order/UpdateOrder.js";
import { deleteOrder } from "../controller/order/DeleteOrder.js";
import { searchOrder } from "../controller/order/SearchOrder.js";

const route = express.Router();

route.post("/createorder", createOrder);

route.get("/showorder", showOrder);

route.get("/showorderbyid/:id", showOrderById);

route.put("/updateorder/:id", updateOrder);

route.delete("/deleteorder/:id", deleteOrder);

route.get("/searchorder", searchOrder);

export default route;