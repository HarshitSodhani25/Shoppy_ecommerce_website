import express from "express";
import { checkUser, createUser, validateUser } from "../Controller/Auth.js";
import passport from "passport"

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", passport.authenticate('local'), validateUser);
router.get("/check", passport.authenticate('jwt'), checkUser)

export default router