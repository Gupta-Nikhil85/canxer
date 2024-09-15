// TODO: while creating an endpoint,make sure it starts with a / and does not end with a /

const Endpoint = require('../models/Endpoint');

const validateEndpoint = async(req, res, next) =>{
try{

    console.log('Validating endpoint...');
    
    const version = req.params.version; // Extract version from URL
    const endpointUrl = `/${req.params[0]}`; // Extract additional path if any
    const projectId = req.query.projectId; // Extract projectId from query parameters
    const method = req.method; // HTTP method (GET, POST, etc.)
    
    // Validate required parameters
    if (!version || !endpointUrl || !projectId || !method) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }  
    
    console.log(`Version: ${version}`);
    console.log(`Endpoint: ${endpointUrl}`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Request method: ${method}`);

    // Find the endpoint in the database
    const endpoint = await Endpoint.findOne({
        projectId,
        endpointUrl,
        requestMethod: method,
        version
    });

    if (!endpoint) {
        return res.status(404).json({ message: 'Endpoint not found' });
    }

    console.log('Endpoint found:', endpoint);
    req.endpoint = endpoint;
    
    next();
} catch (error) {
    console.error('Error executing workflow:', error);
    res.status(500).send('An error occurred');
  }
}

module.exports = validateEndpoint;