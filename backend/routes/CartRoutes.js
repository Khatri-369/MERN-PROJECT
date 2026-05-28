import express from "express";
import { CreateCart } from "../controller/cart/CreateCart.js";
import { DeleteCart } from "../controller/cart/DeleteCart.js";
import { ShowCart } from "../controller/cart/ShowCart.js";
import { ShowCartId } from "../controller/cart/ShowCartId.js";
import { ShowCartSearch } from "../controller/cart/ShowCartSearch.js";
import { UpdateCart } from "../controller/cart/UpdateCart.js";
const route = express.Router();

route.post("/createcart", CreateCart);
route.get("/showcart", ShowCart);
route.get("/showcart/:id", ShowCartId);
route.put("/updatecart/:id", UpdateCart);
route.delete("/deletecart/:id", DeleteCart);
route.get("/searchcart", ShowCartSearch);

export default route;