import express from "express";
import { addToCart } from "../controllers/cartController.js";
import { getCart } from "../controllers/cartController.js";
import { userAuthorization } from "../middleware/userAuth.js";
import { updateCartQuantity, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", userAuthorization(["user"]), addToCart);
router.get("/get", userAuthorization(["user"]), getCart);
router.put("/update-quantity", userAuthorization(["user"]), updateCartQuantity);
router.delete(
    "/remove",
    userAuthorization(["user"]),
    removeFromCart
);
export default router;