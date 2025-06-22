import ejs from "ejs";
import dotenv from "dotenv";
import sendMail from "../helpers/sendMail.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";
dotenv.config();

const sendWelcomeEmail = async() => {
    const users = await User.find({ status: 0 });
    if (users.length > 0) {
        for (let user of users) {
            ejs.renderFile(
                "templates/welcome.ejs", { name: user.name },
                async(err, data) => {
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

                    try {
                        await sendMail(messageoptions);
                        await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
                    } catch (error) {
                        console.log(error);
                    }
                }
            );
        }
    }
};

export default sendWelcomeEmail;