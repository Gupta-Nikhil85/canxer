const Organisation = require('../models/Organisation');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../utils/email');
const { generateRandomPassword } = require('../utils/generatePassword');

// Create Organisation
exports.createOrganisation = async (req, res) => {
    try {
        const { name, address, industry, adminName, adminEmail } = req.body;

        // Creating a new organisation
        const organisation = new Organisation({ name, address, industry });
        await organisation.save();

        // Creating an admin user for the organisation
        const password = generateRandomPassword();
        const resetToken = generateResetToken();
        const hashedToken = hashResetToken(resetToken);
        const adminUser = new User({
            name: adminName,
            email: adminEmail,
            password,
            role: 'admin',
            organisation: organisation._id,
            resetPasswordToken: hashedToken,
            resetPasswordExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
        });
        await adminUser.save();
        
        // Send welcome email to the admin user
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${password}`;
        await sendWelcomeEmail(adminUser.email, resetUrl);

        res.status(201).json({ organisation, adminUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrganisationById = async (req, res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);

        if (!organisation) {
            return res.status(404).json({ error: 'Organisation not found' });
        }

        // Check if the user is authorized to view the organisation
        const requestingUser = await User.findById(req.user.id);
        if(requestingUser.organisation.toString() !== organisation._id.toString()) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        res.status(200).json({ organisation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Organisation (Admin only)
exports.updateOrganisation = async (req, res) => {
    try {
        const organisationId = req.params.id;
        const { name, address, industry } = req.body;

        let organisation = await Organisation.findById(organisationId);

        if (!organisation) {
            return res.status(404).json({ error: 'Organisation not found' });
        }

        organisation = await Organisation.findByIdAndUpdate(
            organisationId,
            { name, address, industry },
            { new: true, runValidators: true }
        );

        res.status(200).json({ organisation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Organisation (Admin only)
exports.deleteOrganisation = async (req, res) => {
    try {
        const organisationId = req.params.id;

        let organisation = await Organisation.findById(organisationId);

        if (!organisation) {
            return res.status(404).json({ error: 'Organisation not found' });
        }

        await Organisation.findByIdAndDelete(organisationId);

        res.status(200).json({ message: 'Organisation deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};