import express from "express";
const route = express.Router();

import { CreateCategory } from "../controller/category/CreateCategory.js";
import { DeleteCategory } from "../controller/category/DeleteCategory.js";
import { ShowCategory } from "../controller/category/ShowCategory.js";
import { ShowCategoryId } from "../controller/category/ShowCategoryId.js";
import { ShowCategorySearch } from "../controller/category/ShowCategorySearch.js";
import { UpdateCategory } from "../controller/category/UpdateCategory.js";

route.post("/createcategory", CreateCategory);
route.get("/showcategory", ShowCategory);
route.get("/showcategory/:id", ShowCategoryId);
route.put("/updatecategory/:id", UpdateCategory);
route.delete("/deletecategory/:id", DeleteCategory);
route.get("/searchcategory", ShowCategorySearch);

export default route;