const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const organisationRoutes = require('./routes/organisationRoutes')
const projectRoutes = require('./routes/projectRoutes')
const endpointRoutes = require('./routes/endpointRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const databaseMetadataRoutes = require('./routes/databaseMetadataRoutes');
const stepRoutes = require('./routes/stepRoutes');
const executeRequestRoutes = require('./routes/executeRequestRoutes');


dotenv.config();

connectDB();

const app = express();

app.use(express.json());


// Metadata API

app.use('/api/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/endpoints', endpointRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/databaseMetadata', databaseMetadataRoutes);
app.use('/api/steps', stepRoutes);

// End-user API

app.all('/api/:version/*', executeRequestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
