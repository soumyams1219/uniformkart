import { Router } from "express";

import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getUserOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { userAuthorization } from "../middleware/userAuth.js";

const router = Router();

router.post(
    "/create-order",
    userAuthorization(["user"]),
    createOrder
);
router.get("/my-orders", userAuthorization(["user"]),getUserOrders);
router.get("/order-details/:id", userAuthorization(["user"]),getOrderDetails);
router.put("/update-status/:id", userAuthorization(["admin"]),updateOrderStatus);
router.get(
    "/all-orders",
    userAuthorization(["admin"]),
    getAllOrders
);

export default router;
