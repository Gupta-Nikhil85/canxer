const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const organisationRoutes = require('./routes/organisationRoutes')
const projectRoutes = require('./routes/projectRoutes')
const resourceRoutes = require('./routes/resourceRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const databaseMetadataRoutes = require('./routes/databaseMetadataRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/databaseMetadata', databaseMetadataRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
