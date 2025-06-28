import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Create transporter configuration
const createTransporter = () => {
    // Check if email credentials are available
    if (!process.env.EMAIL || !process.env.PASSWORD) {
        throw new Error("Email credentials not found. Please set EMAIL and PASSWORD environment variables in Backend/.env file");
    }

    return nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        requireTls: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
};

// Send immediate order confirmation email
const sendOrderConfirmationEmail = async(orderData) => {
    try {
        const transporter = createTransporter();

        // Verify connection
        await transporter.verify();

        // Render email template
        const templatePath = path.join(process.cwd(), "..", "BackgroundServices", "templates", "pendingorder.ejs");
        const htmlContent = await ejs.renderFile(templatePath, {
            name: orderData.name,
            products: orderData.products,
        });

        // Read logo file (using placed.png for pending orders)
        const logoPath = path.join(process.cwd(), "..", "BackgroundServices", "templates", "placed.png");
        let logoBuffer = null;
        try {
            logoBuffer = fs.readFileSync(logoPath);
        } catch (error) {
            console.log("Logo file not found, sending email without logo");
        }

        // Prepare email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: orderData.email,
            subject: "Your order has been placed - Velmira",
            html: htmlContent,
        };

        // Add logo attachment if available
        if (logoBuffer) {
            mailOptions.attachments = [{
                filename: 'placed.png',
                content: logoBuffer,
                cid: 'logo'
            }];
        }

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Order confirmation email sent successfully:", info.response);
        return true;

    } catch (error) {
        console.error("Failed to send order confirmation email:", error.message);
        return false;
    }
};

export default sendOrderConfirmationEmail;