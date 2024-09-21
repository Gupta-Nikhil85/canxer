const fs = require('fs').promises;

/**
 * Performs file operations based on the provided configuration.
 *
 * @param {Object} config - The configuration object for the file operation.
 * @param {string} config.operation - The type of file operation ('read', 'write', 'delete').
 * @param {string} config.filePath - The path of the file to operate on.
 * @param {string} [config.data] - The data to write if the operation is 'write'.
 * @returns {Promise<string|Object>} - A promise that resolves to a success message or file content.
 */
const executeFileOperation = async (config) => {
    const { operation, filePath, data } = config;

    try {
        switch (operation) {
            case 'read':
                const fileContent = await fs.readFile(filePath, 'utf-8');
                return fileContent;

            case 'write':
                await fs.writeFile(filePath, data, 'utf-8');
                return 'File written successfully';

            case 'delete':
                await fs.unlink(filePath);
                return 'File deleted successfully';

            default:
                throw new Error('Invalid file operation specified.');
        }
    } catch (error) {
        throw new Error(`Error performing file operation: ${error.message}`);
    }
};

module.exports = { executeFileOperation };
