import { fetchAllProducts, createProduct, fetchProductById, updateProduct } from "../Controller/Product.js";
import express from "express";
const router = express.Router();

//get all products
router.get("/", fetchAllProducts);

//create a new product
router.post("/", createProduct);

//fetch a single product for product detail
router.get("/:productid", fetchProductById);

//update a product used by admin
router.patch("/:productid", updateProduct);

export default router