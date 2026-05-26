import express from "express";
import { CreateCart } from "../controller/cart/CreateCart.js";
import { DeleteCart } from "../controller/cart/DeleteCart.js";
import { ShowCart } from "../controller/cart/ShowCart.js";
import { ShowCartId } from "../controller/cart/ShowCartId.js";
import { ShowCartBySearch } from "../controller/cart/ShowCartSearch.js";
import { UpdateCart } from "../controller/cart/UpdateCart.js";

const router = express.Router();

router.post("/createcart", CreateCart);
router.get("/showcart", ShowCart);
router.get("/showcartbyid/:id", ShowCartId);
router.get("/showcartbysearch", ShowCartBySearch);
router.put("/updatecart/:id", UpdateCart);
router.delete("/deletecart/:id", DeleteCart);

export default router;