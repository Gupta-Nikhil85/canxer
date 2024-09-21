/**
 * 
 * @param {*} condition - The condition to evaluate
 * @returns {boolean} The result of the condition evaluation
 * @description Execute a condition based on the given condition and step results
 * @example
 * const condition = {
 *  operator: 'EQUALS',
 * operands: [200, 200]
 * };
 * const result = conditionExecutor(condition);
 * console.log(result); // Output: true
 * 
 * @example
 * const condition = {
 * operator: 'AND',
 * operands: [
 * {
 * operator: 'EQUALS',
 * operands: [200, 200]
 * },
 * {
 * operator: 'GREATER_THAN',
 * operands: [200, 100]
 * }
 * ]
 * };
 * const result = conditionExecutor(condition);
 * console.log(result); // Output: true
 * 
 */
const conditionExecutor = (condition) => {
    const { operator, operands } = condition;
    
    const [operand1, operand2] = operands;
    
    switch (operator) {
        case 'AND':
            return conditionExecutor(operand1) && conditionExecutor(operand2);
            
        case 'OR':
            return conditionExecutor(operand1) || conditionExecutor(operand2);
            
        case 'EQUALS':
            return operand1 === operand2;
            
        case 'NOT_EQUALS':
            return operand1 !== operand2;
            
        case 'GREATER_THAN':
            return operand1 > operand2;
            
        case 'LESS_THAN':
            return operand1 < operand2;
            
        case 'GREATER_THAN_OR_EQUAL':
            return operand1 >= operand2;
            
        case 'LESS_THAN_OR_EQUAL':
            return operand1 <= operand2;
            
        case 'CONTAINS':
            return operand1.includes(operand2);
            
        case 'NOT_CONTAINS':
            return !operand1.includes(operand2);
            
        case 'IS_EMPTY':
            return operand1 === '';
            
        case 'IS_NOT_EMPTY':
            return operand1 !== '';
            
        default:
            return false;
    }
}
/**
 * 
 * @param {*} conditionConfig - The condition configuration
 * @returns {string} The ID of the next step to execute
 * @description Execute a condition based on the given condition configuration and step results
 * @example
 * const conditionConfig = {
 * condition: {
 * operator: 'EQUALS',
 * operands: [200, 200]
 * },
 * onTrue: 'step_1',
 * onFalse: 'step_2'
 * };
 * 
 * const nextStepId = executeCondition(conditionConfig);
 * console.log(nextStepId); // Output: 'step_1'
 */
const executeCondition = (conditionConfig) => {
    const { condition, onTrue, onFalse } = conditionConfig;
    
    const result = conditionExecutor(condition);
    
    const nextStepId = result ? onTrue : onFalse;

    return nextStepId;
}

module.exports = { executeCondition };