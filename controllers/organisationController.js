const Organisation = require('../models/Organisation');
const User = require('../models/User');
const { sendResetEmail } = require('../utils/email');
const { generateRandomPassword } = require('../utils/generatePassword');

// Create Organisation
exports.createOrganisation = async (req, res) => {
    try {
        const { name, address, industry, adminName, adminEmail } = req.body;

        const organisation = new Organisation({ name, address, industry });
        await organisation.save();

        const password = generateRandomPassword();
        const adminUser = new User({
            name: adminName,
            email: adminEmail,
            password,
            role: 'admin',
            organisation: organisation._id,
        });
        await adminUser.save();

        await sendResetEmail(adminUser.email, password);

        res.status(201).json({ organisation, adminUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Organisation and its Users
exports.getOrganisation = async (req, res) => {
    try {
        const organisationId = req.params.id;
        const organisation = await Organisation.findById(organisationId);

        if (!organisation) {
            return res.status(404).json({ error: 'Organisation not found' });
        }

        const users = await User.find({ organisation: organisationId }).select('-password');

        res.status(200).json({ organisation, users });
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

        // Check if the user is an admin of the organisation
        const requestingUser = await User.findById(req.user.id);
        if (requestingUser.role !== 'admin' || requestingUser.organisation.toString() !== organisationId) {
            return res.status(403).json({ error: 'Not authorized' });
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
