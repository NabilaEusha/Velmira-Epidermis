import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";
dotenv.config();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendWelcomeEmail = async() => {
    try {
        const users = await User.find({ status: 0 }).limit(5); // Limit to 5 users per batch

        if (users.length > 0) {
            console.log(`Processing ${users.length} new users for welcome emails`);

            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                try {
                    // Process email sending
                    const emailSent = await new Promise((resolve, reject) => {
                        ejs.renderFile(
                            "templates/welcome.ejs", { name: user.name },
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
                                        to: user.email,
                                        subject: "Welcome to Velmira",
                                        html: data,
                                        attachments: [{
                                            filename: 'logo.png',
                                            content: logoBuffer,
                                            cid: 'logo' // Content ID for referencing in HTML
                                        }]
                                    };

                                    await sendMail(messageoptions);
                                    await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
                                    console.log(`Welcome email sent successfully to ${user.email}`);
                                    resolve(true);
                                } catch (error) {
                                    console.error(`Failed to send email to ${user.email}:`, error.message);
                                    reject(error);
                                }
                            }
                        );
                    });

                    // Add delay between emails (2 seconds)
                    if (i < users.length - 1) {
                        await delay(2000);
                    }

                } catch (error) {
                    console.error(`Error processing user ${user.email}:`, error.message);
                    // Continue with next user even if one fails
                }
            }
        }
    } catch (error) {
        console.error("Error in sendWelcomeEmail:", error.message);
    }
};

export default sendWelcomeEmail;