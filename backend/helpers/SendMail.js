import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


// Configure transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address from .env
    pass: process.env.EMAIL_PASS, // App password from .env
   
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text message
 * @param {string} html - HTML message (optional)
 */
export async function sendMail(to, subject, text, html = "") {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending mail:", error.message);
    throw error;
  }
}
