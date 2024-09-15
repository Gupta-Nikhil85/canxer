const mongoose = require('mongoose');
const {Schema} = mongoose;
const DatabaseMetadata = require('../models/DatabaseMetadata');

/**
 * Constructs a model name using the provided parameters.
 * 
 * @param {string} db_name - The name of the database or collection.
 * @param {string} version - The version of the model.
 * @param {string} projectId - The project identifier.
 * @param {string} organisationId - The organization identifier.
 * 
 * @returns {string} - The constructed model name.
 */
const getModelName = (db_name, version, projectId, organisationId) => {
    return `${db_name}_${version}_${projectId}_${organisationId}`;
}


/**
 * Generates a Mongoose schema structure from the provided field definitions.
 * 
 * @param {Array<Object>} fields - An array of field definitions for the schema.
 * @param {string} fields[].name - The name of the field.
 * @param {string} fields[].type - The type of the field (e.g., 'String', 'Number').
 * @param {boolean} [fields[].required] - Whether the field is required.
 * @param {number} [fields[].min] - The minimum value for numeric fields.
 * @param {number} [fields[].max] - The maximum value for numeric fields.
 * @param {RegExp} [fields[].match] - A regular expression for string fields.
 * @param {boolean} [fields[].immutable] - Whether the field is immutable.
 * @param {boolean} [fields[].trim] - Whether to trim whitespace from the field value.
 * @param {boolean} [fields[].lowercase] - Whether to convert the field value to lowercase.
 * @param {boolean} [fields[].uppercase] - Whether to convert the field value to uppercase.
 * @param {Function} [fields[].set] - A function to transform the field value before saving.
 * @param {Function} [fields[].get] - A function to transform the field value when retrieving.
 * @param {string} [fields[].alias] - An alias for the field.
 * @param {string|Model} [fields[].ref] - A reference to another model (for population).
 * @param {boolean} [fields[].autopopulate] - Whether to automatically populate the field.
 * @param {Function} [fields[].transform] - A function to transform the field value.
 * @param {*} [fields[].default] - The default value for the field.
 * 
 * @returns {Schema} - A Mongoose schema based on the provided field definitions.
 */
const getSchemaStructure = (fields) => {
    let schemaDefinition = {};
    fields.forEach(field => {
        let fieldOptions = {};
        const { name, type, required, unique, index, sparse, select, validate, min, max, match, immutable, trim, lowercase, uppercase, set, get, alias, ref, autopopulate, transform } = field;
        // for each field, if the field is not null, add it to the schema definition

        if (required) {
            fieldOptions.required = required;
        }
        if (unique) {
            fieldOptions.unique = unique;
        }
        if (index) {
            fieldOptions.index = index;
        }
        if (sparse) {
            fieldOptions.sparse = sparse;
        }
        if (select) {
            fieldOptions.select = select;
        }
        if (validate) {
            fieldOptions.validate = validate;
        }
        if (min) {
            fieldOptions.min = min;
        }
        if (max) {
            fieldOptions.max = max;
        }
        if (match) {
            fieldOptions.match = match;
        }
        if (immutable) {
            fieldOptions.immutable = immutable;
        }
        if (trim) {
            fieldOptions.trim = trim;
        }
        if (lowercase) {
            fieldOptions.lowercase = lowercase;
        }
        if (uppercase) {
            fieldOptions.uppercase = uppercase;
        }
        if (set) {
            fieldOptions.set = set;
        }
        if (get) {
            fieldOptions.get = get;
        }
        if (alias) {
            fieldOptions.alias = alias;
        }
        if (ref) {
            fieldOptions.ref = ref;
        }
        if (autopopulate) {
            fieldOptions.autopopulate = autopopulate;
        }
        if (transform) {
            fieldOptions.transform = transform;
        }
        fieldOptions.type = global[type];
        fieldOptions.default = field.default;
        schemaDefinition[name] = fieldOptions;
    });
    return new Schema(schemaDefinition);
}

/**
 * Retrieves a Mongoose model based on the model_id, creating it if it does not already exist.
 * 
 * @param {string} model_id - The identifier for the model in the DatabaseMetadata collection.
 * 
 * @returns {Promise<Model>} - A promise that resolves to a Mongoose model created from the database metadata.
 * 
 * @throws {Error} - Throws an error if the database metadata cannot be found or if an error occurs while creating the model.
 */
module.exports = async (model_id) => {
    try {
        const dbMetadata = await DatabaseMetadata.findById(model_id).populate('attributes');
        if (!dbMetadata) {
            throw new Error('Database not found');
        }
        const { name, version, projectId, organisationId } = dbMetadata;
        const modelName = getModelName(name, version, projectId, organisationId);
        const attributes = dbMetadata.attributes;
        const schema = getSchemaStructure(attributes);
        return mongoose.model(modelName, schema);
    } catch (error) {
        throw error; // Added to ensure errors are properly propagated
    }
}
