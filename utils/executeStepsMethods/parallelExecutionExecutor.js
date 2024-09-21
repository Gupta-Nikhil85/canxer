const Step = require('../../models/Step');
const { executeStep } = require('../stepExecutor');
const { resolvePlaceholders } = require('../executeStep.utils');

/**
 * Executes multiple steps in parallel based on the provided configuration.
 *
 * @param {Object} parallelConfig - The configuration object for parallel execution.
 * @param {Array} parallelConfig.stepIds - An array of step IDs to be executed in parallel.
 * @param {Object} context - The context object that stores the outputs of previous steps.
 * 
 * @returns {Promise<Array>} - A promise that resolves to an array of results from the executed steps.
 *
 * @throws {Error} - Throws an error if any of the steps fail to execute or if no step IDs are provided.
 */
const executeParallelExecution = async (parallelConfig, context) => {
  try {
    const { stepIds } = parallelConfig;

    if (!Array.isArray(stepIds) || stepIds.length === 0) {
      throw new Error('No step IDs provided for parallel execution.');
    }

    // Execute all steps in parallel
    const stepPromises = stepIds.map(async (stepId) => {
      const step = await Step.findById(stepId);
      if (!step) {
        throw new Error(`No step found with ID: ${stepId}`);
      }

      // Resolve placeholders in the step configuration
      const resolvedStep = resolvePlaceholders(step, context);
      
      // Execute the step and return the result
      return executeStep(resolvedStep, context);
    });

    // Wait for all promises to resolve
    const results = await Promise.all(stepPromises);
    
    return results; // Return the results of all executed steps
  } catch (error) {
    throw new Error(`Error executing steps in parallel: ${error.message}`);
  }
};

module.exports = { executeParallelExecution };
