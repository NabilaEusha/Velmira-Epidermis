import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
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
};

const sendMail = async (messageoption) => {
  try {
    const transporter = await createTransporter(configurations);
    await transporter.verify();
    const info = await transporter.sendMail(messageoption);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.log("Email sending failed:", error.message);
  }
};

export default sendMail;
