import express from "express"
const router = express.Router();
import {fetchBrands, createBrand} from "../Controller/Brand.js"

router.get("/", fetchBrands)
router.post("/", createBrand)

export default router;