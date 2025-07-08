import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
import sendOrderConfirmationEmail from "../util/sendOrderEmail.js";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

// Checkout Session Route
router.post("/create-checkout-session", async(req, res) => {
    const { userId, name, email, cart } = req.body;

    try {
        const customer = await stripe.customers.create({
            metadata: {
                userId,
                name,
                email,
            },
        });

        const line_items = cart.products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.title,
                    images: [product.img],
                    description: product.desc,
                    metadata: {
                        id: product._id,
                    },
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            line_items,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/myorders?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        // Generate a unique key for this order (userId + cart hash)
        const orderKey = `${userId}-${Buffer.from(JSON.stringify(cart.products)).toString('base64')}`;

        // Try to find an existing unpaid order for this user and cart
        let savedOrder = await Order.findOne({ orderKey, paid: false });

        if (!savedOrder) {
            savedOrder = await Order.create({
                sessionId: session.id,
                orderKey,
                name,
                userId,
                email,
                products: cart.products,
                total: cart.total,
                paid: false, // will update after payment
            });

            // Send immediate order confirmation email
            try {
                const emailSent = await sendOrderConfirmationEmail(savedOrder);
                if (emailSent) {
                    console.log(`Order confirmation email sent to ${savedOrder.email} via Stripe checkout`);
                    // Mark pending email as sent
                    await Order.findByIdAndUpdate(savedOrder._id, { pendingEmailSent: true });
                } else {
                    console.log(`Failed to send order confirmation email to ${savedOrder.email} via Stripe checkout`);
                }
            } catch (error) {
                console.error("Error sending order confirmation email via Stripe:", error.message);
                // Don't fail the checkout if email fails
            }
        } else {
            // If an order already exists, update its sessionId in case it's a new session
            savedOrder.sessionId = session.id;
            await savedOrder.save();
        }

        res.send({ url: session.url });
    } catch (error) {
        console.error("Checkout Session Error:", error.message);
        res.status(500).send({ error: error.message });
    }
});

// Stripe Webhook
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async(req, res) => {
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            if (endpointSecret) {
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
                console.log("✅ Webhook verified");
            } else {
                event = req.body; // For testing without secret
            }

            const data = event.data.object;
            const eventType = event.type;

            if (eventType === "checkout.session.completed") {
                const session = data;

                // Update order as paid
                await Order.findOneAndUpdate({ sessionId: session.id }, { paid: true });

                console.log("✅ Order marked as paid");
            }

            res.status(200).send("Received");
        } catch (err) {
            console.error("❌ Webhook Error:", err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
);

export default router;