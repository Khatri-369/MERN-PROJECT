import express from "express";
import { CreateProduct } from "../controller/product/CreateProduct.js";
import { DeleteProduct } from "../controller/product/DeleteProduct.js";
import { ShowProduct } from "../controller/product/ShowProduct.js";
import { ShowProductId } from "../controller/product/ShowProductId.js";
import { ShowProductSearch } from "../controller/product/ShowProductSearch.js";
import { UpdateProduct } from "../controller/product/UpdateProduct.js";
import { upload } from "../middleware/multer.js";

const route = express.Router();

route.post("/createproduct", upload.array("productphoto", 10), CreateProduct);
route.get("/showproduct", ShowProduct);
route.get("/showproduct/:id", ShowProductId);
route.put("/updateproduct/:id", upload.array("productphoto", 10), UpdateProduct);
route.delete("/deleteproduct/:id", DeleteProduct);
route.get("/searchproduct", ShowProductSearch);

export default route;