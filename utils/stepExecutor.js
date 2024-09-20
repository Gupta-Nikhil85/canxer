const { StepTypes } = require("../utils/enums");
const { executeApiCall } = require("./executeStepsMethods/apiCallExecutor");
const queryExecutor = require("./queryExecutor");
const { resolvePlaceholders } = require("./executeStep.utils");
const { executeCondition } = require("./executeStepsMethods/conditionExecutor");
const { executeTransformation } = require("./executeStepsMethods/transformationExecutor");

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
        result = executeCondition(resolvedConfig, stepResults);
        step.onSuccess.nextStepId = result;
        break;

      case StepTypes.TRANSFORMATION:
        result = await executeTransformation(resolvedConfig, stepResults);
        break;

      case StepTypes.LOOP:
        result = await executeLoop(resolvedConfig, stepResults);
        break;

      case StepTypes.PARALLEL_EXECUTION:
        result = await executeParallelExecution(resolvedConfig, stepResults);
        break;

      case StepTypes.DELAY:
        result = await executeDelay(resolvedConfig);
        break;

      case StepTypes.WEBHOOK_LISTENER:
        result = await executeWebhookListener(resolvedConfig);
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
        result = await executeDataValidation(resolvedConfig, stepResults);
        break;

      case StepTypes.ERROR_HANDLING:
        result = await executeErrorHandling(resolvedConfig, stepResults);
        break;

      case StepTypes.AUTHENTICATION:
        result = await executeAuthentication(resolvedConfig);
        break;

      case StepTypes.WEBHOOK_TRIGGER:
        result = await executeWebhookTrigger(resolvedConfig);
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
