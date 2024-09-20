// TODO: find the actual use case for this function

/**
 * 
 * @param {*} inputFields - The input fields to map
 * @param {*} stepResults - The results of the previous step
 * @returns {Object} The transformed object
 * @description Map the input fields to the output field based on the step results
 * @example
 * const inputFields = ['responseField1', 'responseField2'];
 * const stepResults = {
 * responseField1: 'value1',
 * responseField2: 'value2'
 * };
 * const result = mapTransformation(inputFields, stepResults);
 * console.log(result); // Output: { responseField1: 'value1', responseField2: 'value2' }
 * @throws {Error} When an error occurs
 */

const mapTransformation = (inputFields, stepResults) => {
    try{
        const result = {};
        inputFields.forEach(inputField => {
            result[inputField] = stepResults[inputField];
        });
        return result;
    }
    catch(error){
        throw new Error(`Error mapping fields: ${error.message}`);
    }
}

/**
 * 
 * @param {*} inputFields - The input fields to format
 * @param {*} stepResults - The results of the previous step
 * @returns - {Object} The transformed object
 * @description Format the input fields to the output field based on the step results
 * @example
 * const inputFields = ['responseField1', 'responseField2'];
 * const stepResults = {
 * responseField1: 'value1',
 * responseField2: 'value2'
 * };
 * const result = formatTransformation(inputFields, stepResults);
 * console.log(result); // Output: { responseField1: 'value1', responseField2: 'value2' }
 * @throws {Error} When an error occurs
 */
const formatTransformation = (inputFields, stepResults) => {   
    try{

        const result = {};
        inputFields.forEach(inputField => {
            result[inputField] = stepResults[inputField];
        });
        return result;
    }
    catch(error){
        throw new Error(`Error formatting fields: ${error.message}`);
    }
}

/**
 * 
 * @param {*} inputFields - The input fields to combine
 * @param {*} stepResults - The results of the previous step
 * @returns {Object} The transformed object
 * @description Combine the input fields to the output field based on the step results
 * @example
 * const inputFields = ['responseField1', 'responseField2'];
 * const stepResults = {
 * responseField1: 'value1',
 * responseField2: 'value2'
 * };
 * const result = combineTransformation(inputFields, stepResults);
 * console.log(result); // Output:  { responseField1: 'value1', responseField2: 'value2'  }
 * @returns 
 */
const combineTransformation = (inputFields, stepResults) => {
    try{

        const result = {};
        inputFields.forEach(inputField => {
            result[inputField] = stepResults[inputField];
        });
        return result;
    }
    catch(error){
        throw new Error(`Error combining fields: ${error.message}`);
    }
}

/**
 * 
 * @param {*} config - The transformation configuration
 * @param {*} stepResults - The results of the previous step
 * @returns - {Object} The transformed object
 * @description Execute a transformation based on the given configuration and step results
 * @example
 * const config = {
 * transformationType: 'map',
 * inputFields: ['responseField1', 'responseField2'],
 * outputField: 'mappedField'
 * };
 * const stepResults = {
 * responseField1: 'value1',
 * responseField2: 'value2'
 * };
 * const result = executeTransformation(config, stepResults);
 * console.log(result); // Output: {mappedField: { responseField1: 'value1', responseField2: 'value2'} } 
 */
const executeTransformation = async (config, stepResults) => {
    try{
    const { transformationType, inputFields, outputField } = config;
    let result = {};
    switch (transformationType) {
        case 'map':
            result[outputField]= mapTransformation(inputFields, stepResults);
            break;
        case 'format':
            result[outputField]= formatTransformation(inputFields, stepResults);
            break;
        case 'combine':
            result[outputField]= combineTransformation(inputFields, stepResults);
            break;
        default:
            throw new Error('Invalid transformation type');
    }
    return result;
    }
    catch(error){
        throw new Error(`Error executing transformation: ${error.message}`);
    }
}

module.exports = { executeTransformation };