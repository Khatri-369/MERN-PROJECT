import express from "express";
import { createShopProduct, getShopProducts, deleteShopProduct } from "../controller/ProductController.js";
import { shopauth } from "../middleware/shopauth.js";
import { upload } from "../middleware/multer.js";

const route = express.Router();

route.post("/add", shopauth, upload.array("productphoto", 10), createShopProduct);
route.get("/", shopauth, getShopProducts);
route.delete("/:id", shopauth, deleteShopProduct);

export default route;
