const Endpoint = require('../models/Endpoint');
const { convertEndpoint } = require('../utils/endpoint.utils');

// TODO: maybe we can add more validation to the endpoint URL based on the meta fields in the database

const validateEndpoint = async(req, res, next) =>{
try{

    console.log('Validating endpoint...');
    
    const version = req.params.version; // Extract version from URL
    const endpointUrl = convertEndpoint(req.params[0]); // Extract additional path if any
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
        version,
        isActive: true
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