const Step = require('../../models/Step');
const { executeStep } = require('../stepExecutor');
const { resolvePlaceholders } = require('../executeStep.utils');

/**
 * Executes a loop that iterates over either a range of values or a predefined set of input values.
 * For each iteration, one or more steps are executed using the current value of the iteration.
 * Conditional logic can be applied to determine whether or not to execute the steps for a given iteration.
 *
 * @param {Object} loopConfig - The configuration object defining the loop.
 * @param {Array} [loopConfig.inputValues] - An array of predefined input values to iterate over (optional).
 * @param {Array} loopConfig.loopStepIds - An array of step IDs to be executed during each loop iteration.
 * @param {Number} [loopConfig.startValue] - The starting value for the loop (used if inputValues is not provided).
 * @param {Number} [loopConfig.endValue] - The end value for the loop (used if inputValues is not provided).
 * @param {String} [loopConfig.currentField] - The name of the field to store the current loop iteration value in the context (optional).
 * @param {String} [loopConfig.condition] - A condition to be checked before executing steps for each loop iteration (optional).
 * @param {Object} context - The workflow context, which contains the outputs of previous steps.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of results from executing the steps for each loop iteration.
 *
 * @throws {Error} - Throws an error if the loop configuration is invalid, such as missing input values or step IDs.
 *
 * @description 
 * - If `inputValues` is provided, the loop will iterate over those values. 
 * - If `inputValues` is not provided, the loop will iterate over a range defined by `startValue` and `endValue`.
 * - For each iteration, the current value is stored in the context (under `currentField`), and each step defined in `loopStepIds` is executed.
 * - Optionally, a `condition` can be provided to determine whether or not to execute the steps for a given iteration.
 *
 * @example
 * const loopConfig = {
 *   inputValues: [1, 2, 3],
 *   loopStepIds: ['step1', 'step2'],
 *   currentField: 'currentValue',
 *   condition: 'currentValue % 2 === 0' // Only execute steps for even numbers
 * };
 * const result = await executeLoop(loopConfig, context);
 * console.log(result); // Logs results of executing steps for each even number (2 in this case).
 */  
const executeLoop = async (loopConfig, context) => {
  try {
    const { inputValues, loopStepIds, startValue, endValue, condition , currentField} = loopConfig;

    // Determine the loop values, based on inputValues or start/end values
    let valuesToLoopOver = inputValues;

    if (!valuesToLoopOver) {
      if (startValue == null || endValue == null) {
        throw new Error('Either inputValues or start/end values must be provided.');
      }
      // Generate an array from start to end
      valuesToLoopOver = Array.from({ length: endValue - startValue + 1 }, (_, i) => startValue + i);
    }

    if (!Array.isArray(loopStepIds) || loopStepIds.length === 0) {
      throw new Error('No steps provided for the loop.');
    }

    const results = [];

    // Iterate over each value and execute the specified steps
    for (const value of valuesToLoopOver) {
      // Create a temporary context for each loop iteration
      let loopContext = { ...context };
        loopContext[currentField] = value;

      // If a condition is specified, evaluate it
      if (condition) {
        const conditionMet = evaluateCondition(condition, loopContext);
        if (!conditionMet) {
          continue; // Skip this iteration if the condition is not met
        }
      }

      // Execute each step specified in the loopStepIds for the current value
      const iterationResults = [];

      for (const stepId of loopStepIds) {
        const loopStep = await Step.findById(stepId);
        if (!loopStep) {
            throw new Error(`No step found with ID: ${stepId}`);
        }
        // Resolve placeholders within the loop step for the current value
        const resolvedLoopStep = resolvePlaceholders(loopStep, loopContext);
        
        // Execute the step for the current value and store the result
        const result = await executeStep(resolvedLoopStep, loopContext);
        iterationResults.push(result);
      }

      results.push(iterationResults); // Store results for this iteration
    }

    return results;
  } catch (error) {
    throw new Error(`Error executing loop: ${error.message}`);
  }
};

/**
 * Evaluates a condition for the current iteration of the loop.
 *
 * @param {String} condition - The condition to be evaluated (e.g., `currentValue > 5`).
 * @param {Object} context - The loop context containing the current value and other variables.
 * 
 * @returns {Boolean} - Returns true if the condition evaluates to true, false otherwise.
 *
 * @throws {Error} - Throws an error if there is a problem evaluating the condition.
 *
 * @description 
 * The function dynamically evaluates the condition using the provided context. It uses the current context's
 * values (like `currentValue`) to determine whether the loop should execute steps for this iteration.
 *
 * @example
 * const condition = 'currentValue % 2 === 0';
 * const context = { currentValue: 4 };
 * const result = evaluateCondition(condition, context); // returns true
 */
const evaluateCondition = (condition, context) => {
  try {
    return new Function('context', `with(context) { return ${condition}; }`)(context);
  } catch (error) {
    console.error('Error evaluating condition:', error.message);
    return false;
  }
};

module.exports = { executeLoop };
