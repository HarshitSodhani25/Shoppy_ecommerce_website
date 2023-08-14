import Express from "express";
const router = Express.Router();
import {addToCart, fetchCartByUser, updateCart, deleteItemFromCart, resetCart} from "../Controller/Cart.js"

router.post("/", addToCart);
router.get("/", fetchCartByUser);
router.patch("/:updateid", updateCart);
router.delete("/reset/", resetCart)
router.delete("/:itemid", deleteItemFromCart);

export default router;