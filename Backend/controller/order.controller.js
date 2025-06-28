import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";
import sendOrderConfirmationEmail from "../util/sendOrderEmail.js";
import sendDeliveredOrderConfirmationEmail from "../util/sendDeliveredOrderEmail.js";

// CREATE ORDER
const createOrder = asyncHandler(async(req, res) => {
    const newOrder = Order(req.body);
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
        res.status(400);
        throw new Error("Order was not created");
    } else {
        // Send immediate order confirmation email
        try {
            const emailSent = await sendOrderConfirmationEmail(savedOrder);
            if (emailSent) {
                console.log(`Order confirmation email sent to ${savedOrder.email}`);
                // Mark pending email as sent
                await Order.findByIdAndUpdate(savedOrder._id, { pendingEmailSent: true });
            } else {
                console.log(`Failed to send order confirmation email to ${savedOrder.email}`);
            }
        } catch (error) {
            console.error("Error sending order confirmation email:", error.message);
            if (error.message.includes("Email credentials not found")) {
                console.error("Please set up EMAIL and PASSWORD environment variables in Backend/.env file");
            }
            // Don't fail the order creation if email fails
        }

        res.status(201).json(savedOrder);
    }
});

// MARK ORDER AS DELIVERED
const markOrderAsDelivered = asyncHandler(async(req, res) => {
    const { orderId } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId, { $set: { status: 2 } }, // status 2 = delivered
        { new: true }
    );

    if (!updatedOrder) {
        res.status(400);
        throw new Error("Order was not found or could not be updated");
    } else {
        // Send immediate delivered order confirmation email only if not already sent
        if (!updatedOrder.deliveredEmailSent) {
            try {
                const emailSent = await sendDeliveredOrderConfirmationEmail(updatedOrder);
                if (emailSent) {
                    console.log(`Delivered order confirmation email sent to ${updatedOrder.email}`);
                    // Mark delivered email as sent
                    await Order.findByIdAndUpdate(updatedOrder._id, { deliveredEmailSent: true });
                } else {
                    console.log(`Failed to send delivered order confirmation email to ${updatedOrder.email}`);
                }
            } catch (error) {
                console.error("Error sending delivered order confirmation email:", error.message);
                if (error.message.includes("Email credentials not found")) {
                    console.error("Please set up EMAIL and PASSWORD environment variables in Backend/.env file");
                }
                // Don't fail the order update if email fails
            }
        } else {
            console.log(`Delivered email already sent to ${updatedOrder.email}`);
        }

        res.status(200).json(updatedOrder);
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

export { getAllOrders, getUserOrder, deleteOrder, createOrder, updateOrder, markOrderAsDelivered };