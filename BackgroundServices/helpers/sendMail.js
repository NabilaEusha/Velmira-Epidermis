import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a single transporter instance to reuse
let transporter = null;

function createTransporter(config) {
    if (!transporter) {
        transporter = nodemailer.createTransport(config);
    }
    return transporter;
}

let configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTls: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    // Add connection pooling and rate limiting
    pool: true,
    maxConnections: 1,
    maxMessages: 1, // Reduced to prevent rate limiting
    rateLimit: 1, // 1 email per second
    // Add retry logic
    retry: {
        attempts: 3,
        delay: 5000
    }
};

const sendMail = async(messageoption) => {
    try {
        const mailTransporter = await createTransporter(configurations);

        // Verify connection before sending
        await mailTransporter.verify();

        const info = await transporter.sendMail(messageoption);
        if (info && info.response) {
            console.log("Email sent successfully:", info.response);
        } else {
            console.log("Email sent successfully");
        }
        return info;
    } catch (error) {
        console.log("Email sending failed:", error.message);

        // If it's a rate limiting error, wait longer
        if (error.code === 'EENVELOPE' || error.responseCode === 421) {
            console.log("Gmail rate limiting detected, waiting 30 seconds...");
            await new Promise(resolve => setTimeout(resolve, 30000));
        }

        throw error; // Re-throw to handle in calling function
    }
};

export default sendMail;