const Project = require('../models/Project');

// TODO: Do we need to allow all the access to org admin?

const checkProjectAccess = async (user, projectId, requiredAccess) => {
    // check if the user has access to the project
    const project = await Project.findById(projectId);
    if (!project) {
        return false;
    }
    const userAccess = project.userAccess.find(access => access.user.toString() === user._id.toString());    
    // If the user access is in the required access array, return true
    if (requiredAccess.includes(userAccess.accessLevel)) {
        return true;
    }
    return false;
}

exports.checkProjectAdmin = async (req, res, next) => {
    try{
        const user = req.user;
        const projectId = req.query.projectId;
        const hasAccess = await checkProjectAccess(user, projectId, ['admin']);
        if (!hasAccess) {
            return res.status(403).send('Not authorized');
        }
        next();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.checkProjectWrite = async (req, res, next) => {
    try{

        const user = req.user;
        const projectId = req.query.projectId;
        const hasAccess = await checkProjectAccess(user, projectId, ['admin', 'write']);
        if (!hasAccess) {
            return res.status(403).send('Not authorized');
        }
        next();
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.checkProjectRead = async (req, res, next) => {
    try{
        const user = req.user;
        const projectId = req.query.projectId;
        const hasAccess = await checkProjectAccess(user, projectId, ['admin', 'write', 'read']);
        if (!hasAccess) {
            return res.status(403).send('Not authorized');
        }
        next();
    }
    catch (error) {
        res.status(500).send(error);
    }
}