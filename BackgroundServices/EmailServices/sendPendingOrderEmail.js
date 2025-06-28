import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import Order from "../models/order.model.js";
import path from "path";
import fs from "fs";
dotenv.config();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendPendingOrderEmail = async() => {
    try {
        const orders = await Order.find({ status: 0, pendingEmailSent: { $ne: true } }).limit(2); // Limit to 2 orders per run

        if (orders.length > 0) {
            console.log(`Processing ${orders.length} pending orders for email notifications`);

            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                console.log(`Processing pending order for: ${order.email}`);

                try {
                    // Mark as being processed first to prevent race conditions
                    await Order.findByIdAndUpdate(order._id, {
                        $set: { pendingEmailSent: true }
                    });

                    // Process email sending
                    const emailSent = await new Promise((resolve, reject) => {
                        ejs.renderFile(
                            "templates/pendingorder.ejs", {
                                name: order.name,
                                products: order.products,
                            },
                            async(err, data) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                try {
                                    // Read the logo file (using placed.png for pending orders)
                                    const logoPath = path.join(process.cwd(), "templates", "placed.png");
                                    const logoBuffer = fs.readFileSync(logoPath);

                                    let messageoptions = {
                                        from: process.env.EMAIL,
                                        to: order.email,
                                        subject: "Your order has been placed",
                                        html: data,
                                        attachments: [{
                                            filename: 'placed.png',
                                            content: logoBuffer,
                                            cid: 'logo' // Content ID for referencing in HTML
                                        }]
                                    };

                                    await sendMail(messageoptions);
                                    await Order.findByIdAndUpdate(order._id, {
                                        $set: { status: 1 }
                                    });
                                    console.log(`Pending order email sent successfully to ${order.email}`);
                                    resolve(true);
                                } catch (error) {
                                    console.error(`Failed to send pending order email to ${order.email}:`, error.message);
                                    // If email fails, revert the flag
                                    await Order.findByIdAndUpdate(order._id, {
                                        $set: { pendingEmailSent: false }
                                    });
                                    reject(error);
                                }
                            }
                        );
                    });

                    // Add delay between emails to prevent Gmail rate limiting
                    if (i < orders.length - 1) {
                        await delay(10000); // 10 seconds delay
                    }

                } catch (error) {
                    console.error(`Error processing order for ${order.email}:`, error.message);
                    // Continue with next order even if one fails
                }
            }
        } else {
            console.log('No new pending orders to process for emails');
        }
    } catch (error) {
        console.error("Error in sendPendingOrderEmail:", error.message);
    }
};

export default sendPendingOrderEmail;