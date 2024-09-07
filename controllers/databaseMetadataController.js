const DatabaseMetadata = require('../models/DatabaseMetadata');
const DBField = require('../models/DBField');
const Project = require('../models/Project');

exports.createDatabaseMetadata = async (req, res) => {
    try {
        const dbFields = req.body.attributes;
        if(!dbFields || dbFields.length === 0) {
            return res.status(400).send({ error: 'Fields are required' });
        }
        // create the fields
        const fieldIds = [];
        for(const field of dbFields) {
            const dbField = new DBField(field);
            await dbField.save();
            fieldIds.push(dbField._id);
        }
        req.body.attributes = fieldIds;

        // create the database metadata
        const databaseMetadata = new DatabaseMetadata(req.body);
        await databaseMetadata.save();
        res.status(201).send(databaseMetadata);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getDatabaseMetadata = async (req, res) => {
    try {
        const databaseMetadata = await DatabaseMetadata.findById(req.params.id).populate('attributes');
        if(!databaseMetadata) {
            return res.status(404).send("Database not found");
        }
        res.send(databaseMetadata);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getAllDatabasesByProjectId = async (req, res) => {
    try {
        // if project exists, return all databases
        const project = await Project.findById(req.params.projectId);
        if(!project) {
            return res.status(404).send("Project not found");
        }
        const databases = await DatabaseMetadata.find({ projectId: req.params.projectId }).populate('attributes');
        res.send(databases);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.addDBField = async (req, res) => {
    try {
        const databaseMetadata = await DatabaseMetadata.findById(req.params.id);
        if(!databaseMetadata) {
            return res.status(404).send("Database not found");
        }
        const dbField = new DBField(req.body);
        await dbField.save();

        // update the database metadata with the new field
        databaseMetadata.attributes.push(dbField._id);
        await databaseMetadata.save();

        res.status(201).send(dbField);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteField = async (req, res) => {
    try {
        const databaseMetadata = await DatabaseMetadata.findById(req.params.id);
        if(!databaseMetadata) {
            return res.status(404).send("Database not found");
        }
        const dbField = await DBField.findById(req.params.fieldId);
        if(!dbField) {
            return res.status(404).send("Field not found");
        }
        await dbField.remove();

        // update the database metadata with the new field
        databaseMetadata.attributes = databaseMetadata.attributes.filter(fieldId => fieldId.toString() !== req.params.fieldId);
        await databaseMetadata.save();

        res.send(dbField);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.editField = async (req, res) => {
    try {
        const dbField = await DBField.findByIdAndUpdate(req.params.fieldId, req.body, { new: true, runValidators: true });
        if(!dbField) {
            return res.status(404).send("Field not found");
        }
        res.send(dbField);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateDatabaseName = async (req, res) => {
    try {
        const databaseMetadata = await DatabaseMetadata.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true, runValidators: true });
        if(!databaseMetadata) {
            return res.status(404).send("Database not found");
        }
        res.send(databaseMetadata);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteDatabase = async (req, res) => {
    try {
        const databaseMetadata = await DatabaseMetadata.findById(req.params.id);
        if(!databaseMetadata) {
            return res.status(404).send("Database not found");
        }
        for(const fieldId of databaseMetadata.attributes) {
            await DBField.findByIdAndRemove(fieldId);
        }
        await databaseMetadata.remove();
        res.send(databaseMetadata);
    } catch (error) {
        res.status(500).send(error);
    }
}