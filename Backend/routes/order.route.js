import express from "express";
const router = express.Router();
import { getAllOrders, getUserOrder, deleteOrder, createOrder, updateOrder, markOrderAsDelivered } from "../controller/order.controller.js";
import protect from "../Middleware/auth.middleware.js";

// CREATE ORDER ROUTE
router.post("/", createOrder);
// UPDATE ORDER ROUTE
router.put("/:id", updateOrder);
// MARK ORDER AS DELIVERED ROUTE
router.put("/delivered/:orderId", markOrderAsDelivered);
// GET ALL ORDERS ROUTE
router.get("/", getAllOrders);
// DELETE ORDER ROUTE
router.delete("/:id", deleteOrder);
// GET USER'S ORDER ROUTE
router.get("/find/:id", getUserOrder)

export default router;