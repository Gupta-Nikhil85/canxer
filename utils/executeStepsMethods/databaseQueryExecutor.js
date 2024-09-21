const schemaBuilder = require("../schemaBuilder");

// Enum for query types to standardize the operation names
const QueryEnum = {
    FIND: 'find',
    FIND_ONE: 'findOne',
    INSERT: 'insert',
    INSERT_MANY: 'insertMany',
    UPDATE: 'update',
    UPDATE_MANY: 'updateMany',
    AGGREGATION: 'aggregation',
    DELETE: 'delete',
    DISTINCT: 'distinct',
    COUNT: 'count'  
}

// Function to generate a find query
/**
 * Generates a MongoDB find query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.filter - Conditions to match documents. Example:
 *   {
 *     $or: [
 *       { $and: [{ age: { $gt: 25 } }, { status: "active" }] },
 *       { $and: [{ role: "admin" }, { "address.city": "New York" }] }
 *     ]
 *   }
 * @param {Object} [query.projection] - Fields to include or exclude in results.
 * @param {Object} [query.sort={}] - Fields to sort the result set. Example:
 *   { age: -1 } // Sort by age in descending order
 * @param {number} [query.limit=0] - Maximum number of documents to return.
 * @param {number} [query.skip=0] - Number of documents to skip in result set.
 * @returns {Promise} The result of the find query.
 */
const generateFindQuery = (model, query) => {
    const { filter = {}, projection = {}, sort = {}, limit = 0, skip = 0 } = query;
    return model.find({ ...filter }, { ...projection }).sort({ ...sort }).limit(limit).skip(skip);
}

// Function to generate a findOne query
/**
 * Generates a MongoDB findOne query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.filter - Conditions to match a single document.
 * @param {Object} [query.projection] - Fields to include or exclude.
 * @returns {Promise} The result of the findOne query.
 */
const generateFindOneQuery = (model, query) => {
    const { filter, projection } = query;
    return model.findOne({ ...filter }, { ...projection });
}

/**
 * Generates a distinct query to retrieve unique values for a specified field.
 * 
 * @param {Model} model - The Mongoose model/schema to use for the query.
 * @param {Object} query - The query parameters.
 * @param {string} query.field - The field for which to retrieve distinct values. 
 * 
 * @returns {Promise<Array<any>>} - A promise that resolves to an array of distinct values for the specified field.
 * 
 * @throws {Error} Throws an error if the query fails.
 */
const generateDistinctQuery = (model, query) => {
    const { field } = query;
    // Ensure the field parameter is provided
    if (!field) {
        throw new Error('Field parameter is required for distinct query.');
    }
    return model.distinct(field);
}

/**
 * Generates a count query to count the number of documents matching the specified filter.
 * 
 * @param {Model} model - The Mongoose model/schema to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} [query.filter] - Conditions to match documents for counting. 
 * 
 * @returns {Promise<number>} - A promise that resolves to the count of documents that match the filter.
 * 
 * @throws {Error} Throws an error if the query fails.
 */
const generateCountQuery = (model, query) => {
    const { filter } = query;
    // Count documents based on the filter provided
    return model.countDocuments(filter);
}



// Function to generate an insert query
/**
 * Generates a MongoDB insert query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.document - Document to be inserted into the collection.
 * @returns {Promise} The result of the insert query.
 */
const generateInsertQuery = (model, query) => {
    const { document } = query;
    return model.create(document);
}

// Function to generate an insertMany query
/**
 * Generates a MongoDB insertMany query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Array} query.documents - Array of documents to be inserted.
 * @returns {Promise} The result of the insertMany query.
 */
const generateInsertManyQuery = (model, query) => {
    const { documents } = query;
    return model.insertMany(documents);
}

// Function to generate an update query
/**
 * Generates a MongoDB update query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.filter - Conditions to match documents to update.
 * @param {Object} query.update - Fields to update in the matched documents.
 * @param {Object} [query.options] - Options for the update operation. Example:
 *   { multi: true } // Update multiple documents
 *   { upsert: true } // Insert a new document if no match found
 * @returns {Promise} The result of the update query.
 */
const generateUpdateQuery = (model, query) => {
    const { filter, update, options } = query;
    return model.updateOne({ ...filter }, { ...update }, { ...options });
}

// Function to generate an updateMany query
/**
 * Generates a MongoDB updateMany query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.filter - Conditions to match multiple documents to update.
 * @param {Object} query.update - Fields to update in the matched documents.
 * @param {Object} [query.options] - Options for the update operation. Example:
 *   { multi: true } // Update multiple documents
 * @returns {Promise} The result of the updateMany query.
 */
const generateUpdateManyQuery = (model, query) => {
    const { filter, update, options } = query;
    return model.updateMany({ ...filter }, { ...update }, { ...options });
}

// Function to generate an aggregation query
/**
 * Generates a MongoDB aggregation query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Array} query.pipeline - Array of aggregation stages to perform. Example:
 *   [
 *     { $match: { status: "A" } },
 *     { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
 *     { $sort: { total: -1 } }
 *   ]
 * @returns {Promise} The result of the aggregation query.
 */
const generateAggregationQuery = (model, query) => {
    const { pipeline } = query;
    return model.aggregate(pipeline);
}

// Function to generate a delete query
/**
 * Generates a MongoDB delete query.
 * 
 * @param {Object} model - The Mongoose model to use for the query.
 * @param {Object} query - The query parameters.
 * @param {Object} query.filter - Conditions to match documents to delete.
 * @returns {Promise} The result of the delete query.
 */
const generateDeleteQuery = (model, query) => {
    const { filter } = query;
    return model.deleteOne({ ...filter });
}

// Main function to execute the correct query based on query type


/**
 * Executes a database operation based on the provided configuration.
 * 
 * @param {Object} config - The configuration object.
 * @param {string} config.model_id - The ID of the model/schema to use.
 * @param {Object} config.query - The query parameters.
 * @param {string} config.query.type - The type of query to run (e.g., find, findOne, insert, etc.).
 * @param {Object} [config.query.filter] - Conditions to match documents.
 * @param {Object} [config.query.projection] - Fields to include or exclude in results.
 * @param {Object} [config.query.sort] - Fields to sort the result set.
 * @param {number} [config.query.limit] - Maximum number of documents to return.
 * @param {number} [config.query.skip] - Number of documents to skip in the result set.
 * @param {Object} [config.query.document] - Document to be inserted.
 * @param {Array} [config.query.documents] - Array of documents to be inserted.
 * @param {Object} [config.query.update] - Fields to update in the matched documents.
 * @param {Object} [config.query.options] - Options for the update operation.
 * @param {Array} [config.query.pipeline] - Array of aggregation stages to perform.
 * @param {string} [config.query.field] - The field for which to retrieve distinct values.
 * @param {Object} [config.query.on_failure] - Optional failure handling parameters.
 * @param {string} [config.query.on_failure.error_message] - Custom error message to throw if the query fails.
 * 
 * @returns {Promise<Array<Document> | Document | Object | null>} - The result of the executed query.
 * 
 * @throws {Error} Throws an error if the query type is unknown or if an error occurs.
 */
const executeDatabaseOperation = async (config) => {
    try {
        // Get the schema/model using the model_id
        const model = await schemaBuilder(config.model_id);
        const query = config.query;
        // Switch-case to determine which query to run based on query.type
        switch (query.type) {
            case QueryEnum.FIND:
                return await generateFindQuery(model, query);
            case QueryEnum.FIND_ONE:
                return await generateFindOneQuery(model, query);
            case QueryEnum.INSERT:
                return await generateInsertQuery(model, query);
            case QueryEnum.INSERT_MANY:
                return await generateInsertManyQuery(model, query);
            case QueryEnum.UPDATE:
                return await generateUpdateQuery(model, query);
            case QueryEnum.UPDATE_MANY:
                return await generateUpdateManyQuery(model, query);
            case QueryEnum.AGGREGATION:
                return await generateAggregationQuery(model, query);
            case QueryEnum.DELETE:
                return await generateDeleteQuery(model, query);
            case QueryEnum.DISTINCT:
                return await generateDistinctQuery(model, query);
            case QueryEnum.COUNT:
                return await generateCountQuery(model, query);
            default:
                throw new Error(`Unknown query type: ${query.type}`);
        }
    } catch (error) {
        if (query.on_failure && query.on_failure.error_message) {
            throw new Error(query.on_failure.error_message);
        }
        throw error;
    }
};

module.exports = {executeDatabaseOperation};