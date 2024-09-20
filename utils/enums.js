// stepTypes.js
const StepTypes = Object.freeze({
    API_CALL: 'apiCall',                  // Perform RESTful API actions
    CONDITION: 'condition',               // Evaluate conditions to direct the workflow
    TRANSFORMATION: 'transformation',     // Modify or transform data
    LOOP: 'loop',                         // Repeat a process for multiple items
    PARALLEL_EXECUTION: 'parallelExecution', // Run steps simultaneously
    DELAY: 'delay',                       // Introduce a wait between steps
    WEBHOOK_LISTENER: 'webhookListener',  // Listen for external events
    DB_OPERATION: 'dbOperation',          // Query or update databases
    NOTIFICATION: 'notification',         // Send alerts via different channels
    FILE_OPERATION: 'fileOperation',      // Handle file-related processes
    DATA_VALIDATION: 'dataValidation',    // Validate data before proceeding
    ERROR_HANDLING: 'errorHandling',      // Manage errors and recovery
    AUTHENTICATION: 'authentication',     // Perform authentication processes
    WEBHOOK_TRIGGER: 'webhookTrigger'     // Send data to external systems
});

module.exports = {StepTypes};
