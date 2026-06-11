import { userlogin, userlogout, refreshAccessToken } from "../controllers/AuthContoller.js";
import express from "express";

const router = express.Router();
router.post("/user-login", userlogin);
router.post("/user-logout", userlogout);
router.get("/refresh-token", refreshAccessToken);
export default router;