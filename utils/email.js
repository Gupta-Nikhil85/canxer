const {getWelcomeContent, getResetPasswordContent} = require('./emailContent');
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: `"Canxer" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(message);
};


exports.sendResetEmail = async (email, resetUrl) => {
    const resetContent = getResetPasswordContent(resetUrl);
    return await sendEmail(email, resetContent.subject, resetContent.text);
};

exports.sendWelcomeEmail = async (email, resetUrl) => {
    const welcomeContent = getWelcomeContent(resetUrl);
    return await sendEmail(email, welcomeContent.subject, welcomeContent.text);
}