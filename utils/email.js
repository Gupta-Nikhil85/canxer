const {getWelcomeContent, getResetPasswordContent} = require('./emailContent');
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        secure: false,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        logger: true,
        debug: true,
    });

    const message = {
        from: `"Canxer" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text:text,
        html:html
    };

    await transporter.sendMail(message);
};


exports.sendResetEmail = async (email, resetUrl) => {
    const resetContent = getResetPasswordContent(resetUrl);
    return await sendEmail(email, resetContent.subject, resetContent.text, resetContent.html);
};

exports.sendWelcomeEmail = async (email, resetUrl) => {
    const welcomeContent = getWelcomeContent(resetUrl);
    return await sendEmail(email, welcomeContent.subject, welcomeContent.text, welcomeContent.html);
}