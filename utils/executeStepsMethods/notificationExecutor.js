const nodemailer = require('nodemailer');
const twilio = require('twilio');

/**
 * Sends notifications via email or SMS based on the provided configuration.
 *
 * @param {Object} config - The configuration object for the notification.
 * @param {string} config.type - The type of notification ('email' or 'sms').
 * @param {Object} config.email - The email notification settings.
 * @param {string} config.email.to - The recipient's email address.
 * @param {string} config.email.subject - The subject of the email.
 * @param {string} config.email.text - The text body of the email.
 * @param {Object} config.sms - The SMS notification settings.
 * @param {string} config.sms.to - The recipient's phone number.
 * @param {string} config.sms.body - The body of the SMS.
 * @param {Object} config.credentials - The credentials for sending notifications.
 * @param {string} config.credentials.email - The email credentials.
 * @param {string} config.credentials.twilio - The Twilio credentials.
 * @returns {Promise<string>} - A promise that resolves to a success message.
 */
const executeNotification = async (config) => {
    const { type, email, sms, credentials } = config;

    try {
        if (type === 'email' && email) {
            const { user, pass } = credentials.email;

            // Create a transporter for nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or any other service
                auth: {
                    user,
                    pass,
                },
            });

            // Send email
            await transporter.sendMail({
                from: user,
                to: email.to,
                subject: email.subject,
                text: email.text,
            });

            return 'Email sent successfully';
        } else if (type === 'sms' && sms) {
            const { accountSid, authToken, from } = credentials.twilio;

            // Initialize Twilio client
            const client = twilio(accountSid, authToken);

            // Send SMS
            await client.messages.create({
                body: sms.body,
                from,
                to: sms.to,
            });

            return 'SMS sent successfully';
        } else {
            throw new Error('Invalid notification type or missing configuration.');
        }
    } catch (error) {
        throw new Error(`Error sending notification: ${error.message}`);
    }
};

module.exports = { executeNotification };
