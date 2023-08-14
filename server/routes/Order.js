import Express from "express";
import {createOrder, fetchAllOrders, updateOrder} from "../Controller/Order.js";
const router = Express.Router();

//create orders
router.post("/", createOrder);

//fetch all orders for admin panel
router.get("/", fetchAllOrders);

//update order i.e. status (used by admin)
router.patch("/:orderid", updateOrder);

export default router;