const Project = require('../models/Project');
const Organisation = require('../models/Organisation');
const User = require('../models/User');

// Create a Project
exports.createProject = async (req, res) => {
    try {
        const { name, description, organisationId} = req.body;

        const organisation = await Organisation.findById(organisationId);
        if (!organisation) {
            return res.status(404).json({ error: 'Organisation not found' });
        }
        const userAccess = [
            {
                user: req.user.id,
                accessLevel: 'admin',
            },
        ]

        const project = new Project({
            name,
            description,
            organisation: organisationId,
            userAccess,
            createdBy: req.user.id,
        });
        await project.save();

        res.status(201).json({ project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Projects for an Organisation
exports.getProjects = async (req, res) => {
    try {
        const organisationId = req.params.id;

        const projects = await Project.find({ organisation: organisationId });
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Projects where a user has access (not 'none')
exports.getUserProjects = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Find all projects where the user's access level is not 'none'
      const projects = await Project.find({
        userAccess: {
          $elemMatch: {
            user: userId,
            accessLevel: { $ne: 'none' },
          },
        },
      });
  
      if (!projects || projects.length === 0) {
        return res.status(404).json({ message: 'No projects found for this user.' });
      }
  
      res.status(200).json({ projects });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get Project by ID
exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate('userAccess.user', 'name email');

        if (!project || (req.user.role !=="admin" && project.userAccess.map((access) => access.user._id.toString()).indexOf(req.user.id) === -1)) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Project
exports.updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { name, description, userAccess } = req.body;

        let project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if the user has admin access to the project
        const requestingUser = await User.findById(req.user.id);
        const access = project.userAccess.find(
            (access) => access.user.toString() === requestingUser._id.toString()
        );

        if (!access || access.accessLevel !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        project = await Project.findByIdAndUpdate(
            projectId,
            { name, description, userAccess },
            { new: true, runValidators: true }
        );

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add user access to a project
exports.addUserAccess = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { userEmail, accessLevel } = req.body;

        let project = await
        Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if the user has admin access to the project
        const requestingUser = await User.findById(req.user.id);
        const access = project.userAccess.find(
            (access) => access.user.toString() === requestingUser._id.toString()
        );

        if (!access || access.accessLevel !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Check if the user exists
        const  user = await User.findOne({ email : userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = user._id.toString();

        // Check if the user already has access to the project
        const existingAccess = project.userAccess.find(
            (access) => access.user.toString() === userId && access.accessLevel !== 'none'
        );
        if (existingAccess && existingAccess.accessLevel === accessLevel) {
            return res.status(400).json({ error: 'User already has access to the project' });
        }
        else if (existingAccess) {
            existingAccess.accessLevel = accessLevel;
        }
        else {
            project.userAccess.push({ user: userId, accessLevel });
        }

        await project.save();

        res.status(200).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete Project
exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        let project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if the user has admin access to the project
        const requestingUser = await User.findById(req.user.id);
        const access = project.userAccess.find(
            (access) => access.user.toString() === requestingUser._id.toString()
        );

        if (!access || access.accessLevel !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await project.remove();

        res.status(200).json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
