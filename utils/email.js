const nodemailer = require('nodemailer');

exports.sendResetEmail = async (email, resetUrl) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: `"SaaS App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(message);
};
