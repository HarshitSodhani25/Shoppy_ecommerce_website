import express from "express";
import { fetchOrdersByUserId, fetchUserById, updateUser } from "../Controller/User.js";
const router = express.Router();

router.get("/", fetchUserById);
router.patch("/", updateUser);
router.get("/order/", fetchOrdersByUserId);

export default router
