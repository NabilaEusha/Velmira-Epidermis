import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

// CREATE ORDER
const createOrder = asyncHandler(async(req, res) => {
    const newOrder = Order(req.body);
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
        res.status(400);
        throw new Error("Order was not created");
    } else {
        res.status(201).json(savedOrder);
    }
});

// UPDATE ORDER
const updateOrder = asyncHandler(async(req, res) => {

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true }
    );

    if (!updatedOrder) {
        res.status(400);
        throw new Error("Order was not updated");
    } else {
        res.status(201).json(updatedOrder);
    }
});

// DELETE ORDER
const deleteOrder = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error("order was not deleted successfully");
    } else {
        res.status(200).json(order);
    }
});

// GET USER ORDER
const getUserOrder = asyncHandler(async(req, res) => {
    console.log("=== Fetching User Orders ===");
    console.log("User ID:", req.params.id);
    try {
        // Get only the most recent order for the user
        const order = await Order.findOne({ userId: req.params.id })
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .exec();

        console.log("Found order:", JSON.stringify(order, null, 2));

        // Return the order in an array to maintain compatibility with frontend
        res.status(200).json(order ? [order] : []);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500);
        throw new Error(`Error fetching orders: ${error.message}`);
    }
});


// GET ALL ORDERS
const getAllOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find();

    if (!orders) {
        res.status(400);
        throw new Error("No order was found or something went wrong");
    } else {
        res.status(200).json(orders);
    }
});

export { getAllOrders, getUserOrder, deleteOrder, createOrder, updateOrder };