exports.getResetPasswordContent = (resetUrl) => {
    return {
        subject: 'Password Reset',
        text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
    }
}

exports.getWelcomeContent = (resetUrl) => {
    return {
        subject: 'Welcome to Canxer',
        text: `Welcome to Canxer! We are excited to have you on board. Please click on the link to set up your account: ${resetUrl}`,
    }
}