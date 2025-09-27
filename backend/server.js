const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const deployProject = require('./deploy');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let projects = [];

// Submit project
app.post('/submit', (req, res) => {
    const { username, repoUrl } = req.body;
    if(!username || !repoUrl) return res.status(400).send('Missing fields');

    const projectId = projects.length + 1;
    projects.push({ id: projectId, username, repoUrl, status: 'pending' });

    // Trigger deployment
    deployProject(`project-${projectId}`, repoUrl);

    res.json({ message: 'Project submitted!', projectId });
});

// List all projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
