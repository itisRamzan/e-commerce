"use server"

import { cookies } from "next/headers";
import { getUser } from "./userAuth";
import User from "@/models/User";

const frontEndURL = process.env.NEXT_PUBLIC_HOST;
const nodemailer = require("nodemailer");
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

export async function sendResetPasswordMail(email, token) {
    const user = await User.findOne({ email: email });
    if (!user) {
        return { status: 400, message: "User not found" };
    }
    let emailContent = `We got your request to reset your password. Please click on the link below to reset your password. If you did not request a password reset, you can safely ignore this email.
                
                To reset your password, visit the following address:
                ${frontEndURL}/resetpassword?user=${user.id}&token=${token}
            
                If clicking the link above doesn't work, please copy and paste the URL in a new browser window instead.
            
                Thanks,
                The R & R Team.
                `;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });
    const mailOptions = {
        from: `"R & R Team" <${senderEmail}>`,
        to: email,
        subject: "Reset your password",
        text: emailContent,
        importance: 'high',  // Set email importance to high
        headers: {
            'X-Priority': '1',  // Set email priority to highest
            'X-MSMail-Priority': 'High',  // Set email priority for Outlook
        },
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    return { status: 200, message: "Email sent successfully" };
}