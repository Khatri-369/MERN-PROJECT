import express from "express";
import CreateShop from "../controller/CreateShop.js";
import { LoginShop, getShopProfile, logoutShop } from "../controller/LoginShop.js";
import { shopauth } from "../middleware/shopauth.js";

const route = express.Router();
route.post("/signup", CreateShop);
route.post("/signin", LoginShop);
route.post("/signout", logoutShop);
route.get("/me", shopauth, getShopProfile);

export default route;