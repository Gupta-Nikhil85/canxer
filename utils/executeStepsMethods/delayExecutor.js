/**
 * Executes a delay step, pausing the execution for a specified duration.
 *
 * @param {Object} delayConfig - The configuration object for the delay step.
 * @param {Number} delayConfig.duration - The duration of the delay in milliseconds.
 *
 * @throws {Error} - Throws an error if the duration is not provided or is not a positive number.
 */
const executeDelay = (delayConfig) => {
    const { duration } = delayConfig;
  
    if (duration == null || typeof duration !== 'number' || duration <= 0) {
      throw new Error('A valid positive duration must be provided for the delay.');
    }
  
    // Set a timeout to handle the delay
    setTimeout(() => {
      console.log(`Delayed for ${duration} milliseconds`);
    }, duration);
    
    return null;
  };
  
  module.exports = { executeDelay };
  