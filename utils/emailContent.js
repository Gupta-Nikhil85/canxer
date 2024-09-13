exports.getResetPasswordContent = (resetUrl) => {
    return {
        subject: 'Password Reset Request',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #0056b3;">Password Reset Request</h2>
            <p>Hi there,</p>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0056b3; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
            <br/>
            <p>Thank you,</p>
            <p>The Canxer Team</p>
        </div>
        `,
    }
}
exports.getWelcomeContent = (resetUrl) => {
    return {
        subject: 'Welcome to Canxer!',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #28a745;">Welcome to Canxer!</h2>
            <p>Hi there,</p>
            <p>We are thrilled to have you on board. To get started, click the button below to set up your account:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 4px;">Set Up Your Account</a>
            <p>We look forward to helping you get the most out of our platform.</p>
            <br/>
            <p>Cheers,</p>
            <p>The Canxer Team</p>
        </div>
        `,
    }
}
