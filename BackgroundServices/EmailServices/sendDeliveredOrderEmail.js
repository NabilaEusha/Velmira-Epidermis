import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import Order from "../models/order.model.js";
import path from "path";
import fs from "fs";
dotenv.config();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendDeliveredOrderEmail = async() => {
    try {
        // Only process orders that are delivered (status: 2) and haven't had delivered email sent yet
        const orders = await Order.find({
            status: 2,
            deliveredEmailSent: { $ne: true }
        }).limit(2); // Limit to 2 orders per run to prevent spam

        if (orders.length > 0) {
            console.log(`Processing ${orders.length} delivered orders for email notifications`);

            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                console.log(`Processing delivered order for: ${order.email}`);

                try {
                    // Mark as being processed first to prevent race conditions
                    await Order.findByIdAndUpdate(order._id, {
                        $set: { deliveredEmailSent: true }
                    });

                    // Process email sending
                    const emailSent = await new Promise((resolve, reject) => {
                        ejs.renderFile(
                            "templates/deliveveredorder.ejs", // Correct template name
                            {
                                name: order.name,
                                products: order.products,
                            },
                            async(err, data) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                try {
                                    // Read the logo file
                                    const logoPath = path.join(process.cwd(), "templates", "logo.png");
                                    const logoBuffer = fs.readFileSync(logoPath);

                                    let messageoptions = {
                                        from: process.env.EMAIL,
                                        to: order.email,
                                        subject: "Your order has been delivered - Velmira",
                                        html: data,
                                        attachments: [{
                                            filename: 'logo.png',
                                            content: logoBuffer,
                                            cid: 'logo'
                                        }]
                                    };

                                    await sendMail(messageoptions);
                                    console.log(`Delivered order email sent successfully to ${order.email}`);
                                    resolve(true);
                                } catch (error) {
                                    console.error(`Failed to send delivered order email to ${order.email}:`, error.message);
                                    // If email fails, revert the flag
                                    await Order.findByIdAndUpdate(order._id, {
                                        $set: { deliveredEmailSent: false }
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
                    console.error(`Error processing delivered order for ${order.email}:`, error.message);
                }
            }
        } else {
            console.log('No new delivered orders to process for emails');
        }
    } catch (error) {
        console.error("Error in sendDeliveredOrderEmail:", error.message);
    }
};

export default sendDeliveredOrderEmail;