const queryExecutor = require('./queryExecutor');

const StepEnum = {
    QUERY: 'query',
    VALIDATION: 'validation',
    TRANSFORMATION: 'transformation',
    CONDITIONAL_EXECUTION: 'conditional_execution',
    API_CALL: 'api_call',
};

module.exports = async (workflow, input) => {
    let context = { ...input };
    // console.log('Executing workflow:', workflow.workflowName);
    const steps = workflow.steps.filter((ele) => ele.isActive === true).sort((a, b) => a.executionOrder - b.executionOrder);
    console.log('Steps:', workflow.steps);
    
    // TODO: first step should be to set some data.

    for (const step of steps) {
        try {
            switch (step.stepType) {
                case StepEnum.QUERY:
                    const {model_id, query} = step.body;
                    query.document = context;
                    query.documents = context;
                    query.update = context;
                    // console.log('Executing query:', query);
                    // console.log('Model ID:', model_id);
                    context = await queryExecutor(model_id, query);
                    // Implement your logic to handle queries
                    // e.g., execute a MongoDB query based on `step.parameters`
                    break;
                case StepEnum.VALIDATION:
                    // Implement validation logic
                    break;
                case StepEnum.TRANSFORMATION:
                    // Implement transformation logic
                    break;
                case StepEnum.CONDITIONAL_EXECUTION:
                    // Implement conditional execution logic
                    break;
                case StepEnum.API_CALL:
                    // Implement API call logic
                    break;
                default:
                    throw new Error(`Unknown step type: ${step.type}`);
            }
        } catch (error) {
            if (step.on_failure && step.on_failure.error_message) {
                throw new Error(step.on_failure.error_message);
            }
            throw error;
        }
    }

    return context;
};
