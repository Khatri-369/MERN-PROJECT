import express from "express";
import { CreateProduct } from "../controller/product/CreateProduct.js";
import { DeleteProduct } from "../controller/product/DeleteProduct.js";
import { ShowProduct } from "../controller/product/ShowProduct.js";
import { ShowProductId } from "../controller/product/ShowProductId.js";
import { ShowProductBySearch } from "../controller/product/ShowProductSearch.js";
import { UpdateProduct } from "../controller/product/UpdateProduct.js";

const router = express.Router();

router.post("/createproduct",CreateProduct);
router.get("/showproduct", ShowProduct);
router.get("/showproductbyid/:id",ShowProductId);
router.get("/showproductbysearch",ShowProductBySearch);
router.put("/updateproduct/:id",UpdateProduct);
router.delete("/deleteproduct/:id",DeleteProduct);

export default router;