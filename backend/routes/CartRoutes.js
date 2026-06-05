import express from "express";
import { CreateCart } from "../controller/cart/CreateCart.js";
import { DeleteCart } from "../controller/cart/DeleteCart.js";
import { ShowCart } from "../controller/cart/ShowCart.js";
import { ShowCartId } from "../controller/cart/ShowCartId.js";
import { ShowCartSearch } from "../controller/cart/ShowCartSearch.js";
import { UpdateCart } from "../controller/cart/UpdateCart.js";
import { ShowOneCart } from "../controller/cart/ShowOneCart.js";

import { auth } from "../middleware/auth.js";

const route = express.Router();

route.post("/createcart", auth, CreateCart);
route.get("/showcart", auth, ShowCart);
route.get("/showcart/:id", auth, ShowCartId);
route.put("/updatecart/:id", auth, UpdateCart);
route.delete("/deletecart/:id", auth, DeleteCart);
route.get("/searchcart", auth, ShowCartSearch);
route.get("/showonecart", auth, ShowOneCart);

export default route;