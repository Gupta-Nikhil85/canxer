/**
 * 
 * @param {*} condition - The condition to evaluate
 * @param {*} stepResults - The results from previous steps
 * @returns {boolean} The result of the condition evaluation
 * @description Execute a condition based on the given condition and step results
 * @example
 * const condition = {
 *  operator: 'EQUALS',
 * operands: ['response.status', 200]
 * };
 * const stepResults = {
 * 'response.status': 200
 * };
 * const result = conditionExecutor(condition, stepResults);
 * console.log(result); // Output: true
 * 
 * @example
 * const condition = {
 * operator: 'AND',
 * operands: [
 * {
 * operator: 'EQUALS',
 * operands: ['response.status', 200]
 * },
 * {
 * operator: 'GREATER_THAN',
 * operands: ['response.time', 100]
 * }
 * ]
 * };
 * const stepResults = {
 * 'response.status': 200,
 * 'response.time': 150
 * };
 * const result = conditionExecutor(condition, stepResults);
 * console.log(result); // Output: true
 * 
 */
const conditionExecutor = (condition, stepResults) => {
    const { operator, operands } = condition;
    
    const [operand1, operand2] = operands;
    
    switch (operator) {
        case 'AND':
            return conditionExecutor(operand1, stepResults) && conditionExecutor(operand2, stepResults);
            
        case 'OR':
            return conditionExecutor(operand1, stepResults) || conditionExecutor(operand2, stepResults);
            
        case 'EQUALS':
            return stepResults[operand1] === stepResults[operand2];
            
        case 'NOT_EQUALS':
            return stepResults[operand1] !== stepResults[operand2];
            
        case 'GREATER_THAN':
            return stepResults[operand1] > stepResults[operand2];
            
        case 'LESS_THAN':
            return stepResults[operand1] < stepResults[operand2];
            
        case 'GREATER_THAN_OR_EQUAL':
            return stepResults[operand1] >= stepResults[operand2];
            
        case 'LESS_THAN_OR_EQUAL':
            return stepResults[operand1] <= stepResults[operand2];
            
        case 'CONTAINS':
            return stepResults[operand1].includes(stepResults[operand2]);
            
        case 'NOT_CONTAINS':
            return !stepResults[operand1].includes(stepResults[operand2]);
            
        case 'IS_EMPTY':
            return stepResults[operand1] === '';
            
        case 'IS_NOT_EMPTY':
            return stepResults[operand1] !== '';
            
        default:
            return false;
    }
}
/**
 * 
 * @param {*} conditionConfig - The condition configuration
 * @param {*} stepResults - The results from previous steps
 * @returns {string} The ID of the next step to execute
 * @description Execute a condition based on the given condition configuration and step results
 * @example
 * const conditionConfig = {
 * condition: {
 * operator: 'EQUALS',
 * operands: ['response.status', 200]
 * },
 * onTrue: 'step_1',
 * onFalse: 'step_2'
 * };
 * 
 * const stepResults = {
 * 'response.status': 200
 * };
 * 
 * const nextStepId = executeCondition(conditionConfig, stepResults);
 * console.log(nextStepId); // Output: 'step_1'
 */
const executeCondition = (conditionConfig, stepResults) => {
    const { condition, onTrue, onFalse } = conditionConfig;
    
    const result = conditionExecutor(condition, stepResults);
    
    const nextStepId = result ? onTrue : onFalse;

    return nextStepId;
}

module.exports = { executeCondition };