import express from "express"
const router = express.Router();
import {fetchCategories, createCategory} from "../Controller/Category.js"

router.get("/", fetchCategories)
router.post("/", createCategory)


export default router;