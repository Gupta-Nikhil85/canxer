const { executeStep } = require('./stepExecutor');

const executeWorkflow = async (workflow, req) => {
    let context = {
        steps: {},
        outputs: {},
        body: req.body,         // Request body
        query: req.query,       // Query parameters
        params: req.params      // URL parameters
    };

    workflow.steps.forEach((step) => {
        context.steps[step._id] = step;
    });

    // Start with the first step which does not depend on any other step
    let currentStep = workflow.steps.find((step) => !step.dependsOn);

    while (currentStep) {
        try{
            const result = await executeStep(currentStep, context);

            if(result && currentStep.onSuccess && currentStep.onSuccess.continue){
                currentStep = context.steps[currentStep.onSuccess.nextStepId];
            }
            else if(!result && currentStep.onFailure){
                if(currentStep.onFailure.retry){
                    currentStep.onFailure.retry = false;
                    continue;
                }
                currentStep = context.steps[currentStep.onFailure.fallbackStepId];
            }
            else{
                break;
            }
        } catch (error) {
            console.error('Error executing step:', error);
            throw error;
        }
    }
};

module.exports = { executeWorkflow };