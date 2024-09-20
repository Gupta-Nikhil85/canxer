/***
 * @param {Object} config - The config object with placeholders.
 * @param {Object} context - The context object to resolve the placeholders.
 * @returns {Object} The config object with placeholders resolved.
 * @description This function is used to resolve placeholders in the config object.
 * @example
 * const config = {
 *  url: 'https://jsonplaceholder.typicode.com/posts/{{postId}}',
 * headers: {
 * 'Content-Type': 'application/json',  
 * 'Authorization': 'Bearer {{accessToken}}'
 * },
 * body: {
 * 'title': 'foo',
 * 'body': 'bar',
 * 'userId': 1
 * }
 * };
 * const context = {
 * postId: 1,
 * accessToken : 'token'
 * };
 * 
 * const resolvedConfig = resolvePlaceholders(config, context);
 * console.log(resolvedConfig);
 * // Output: {
 * // url: 'https://jsonplaceholder.typicode.com/posts/1',
 * // headers: {
 * // 'Content-Type': 'application/json',
 * // 'Authorization ': 'Bearer token'
 * // },
 * // body: {
 * // 'title': 'foo',
 * // 'body': 'bar',
 * // 'userId': 1
 * // }
 * // }
 * @throws {Error} When an error occurs
 */

const resolvePlaceholders = (config, context) => {
    try{
        const configStr = JSON.stringify(config);
        const resolvedConfigStr = configStr.replace(/\{\{(.*?)\}\}/g, (_, key) => {
            const keys = key.split(".");
            let value = context;
            keys.forEach((k) => (value = value[k]));
            return value;
        });
        
        return JSON.parse(resolvedConfigStr);
    }
    catch(error){
        throw new Error(`Failed to resolve placeholders: ${error.message}`);
    }
};

module.exports = {
    resolvePlaceholders
};