const { StepTypes } = require("../utils/enums");
const { executeApiCall } = require("./executeStepsMethods/apiCallExecutor");
const { resolvePlaceholders } = require("./executeStep.utils");
const { executeCondition } = require("./executeStepsMethods/conditionExecutor");
const { executeTransformation } = require("./executeStepsMethods/transformationExecutor");
const { executeLoop } = require("./executeStepsMethods/loopExecutor");
const { executeParallelExecution } = require("./executeStepsMethods/parallelExecutionExecutor");
const { executeDatabaseOperation } = require("./executeStepsMethods/databaseQueryExecutor");
const { executeNotification } = require("./executeStepsMethods/notificationExecutor");
const { executeFileOperation } = require("./executeStepsMethods/fileOperationExecutor");

const executeStep = async (step, context) => {
  try {
    const { stepType, config, stepId } = step;
    const resolvedConfig = resolvePlaceholders(config, context);
    let result;
    switch (stepType) {
      case StepTypes.API_CALL:
        result = await executeApiCall(resolvedConfig);
        break;

      case StepTypes.CONDITION:
        result = executeCondition(resolvedConfig);
        step.onSuccess.nextStepId = result;
        break;

      case StepTypes.TRANSFORMATION:
        result = executeTransformation(resolvedConfig);
        break;

      case StepTypes.LOOP:
        result = await executeLoop(resolvedConfig, context);
        break;

      case StepTypes.PARALLEL_EXECUTION:
        result = await executeParallelExecution(resolvedConfig);
        break;

      case StepTypes.DELAY:
        result = executeDelay(resolvedConfig);
        break;

      case StepTypes.WEBHOOK_LISTENER:
        result = "Webhook listener not implemented";
        // result = await executeWebhookListener(resolvedConfig);
        break;

      case StepTypes.DB_OPERATION:
        result = await executeDatabaseOperation(resolvedConfig);
        break;

      case StepTypes.NOTIFICATION:
        result = await executeNotification(resolvedConfig);
        break;

      case StepTypes.FILE_OPERATION:
        result = await executeFileOperation(resolvedConfig);
        break;

      case StepTypes.DATA_VALIDATION:
        result = "Data validation not implemented";
        // result = await executeDataValidation(resolvedConfig, stepResults);
        break;

      case StepTypes.ERROR_HANDLING:
        result = "Error handling not implemented";
        // result = await executeErrorHandling(resolvedConfig, stepResults);
        break;

      case StepTypes.AUTHENTICATION:
        result = "Authentication not implemented";
        // result = await executeAuthentication(resolvedConfig);
        break;

      case StepTypes.WEBHOOK_TRIGGER:
        result = "Webhook trigger not implemented";
        // result = await executeWebhookTrigger(resolvedConfig);
        break;

      default:
        throw new Error(`Unknown step type: ${stepType}`);
    }
    context.outputs[stepId] = result;
    return result;
  } catch (error) {
    console.log(`Step failed: ${step.stepName}, Error: ${error.message}`);
    return null;
  }
};

module.exports = { executeStep };
