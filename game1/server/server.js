const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Mock database (replace with a real database like MongoDB or MySQL in production)
let entries = [];
let votes = {};
let startTime = Date.now();  // This will be the server's start time for the timer

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to get all entries
app.get('/entries', (req, res) => {
    res.json(entries);
});

// API endpoint to submit a new opinion
app.post('/submit', (req, res) => {
    const { name, pitch } = req.body;
    const entryId = `entry-${Date.now()}`;
    entries.push({ id: entryId, name, pitch, votes: 0 });
    votes[entryId] = 0;
    res.status(200).send('Opinion submitted');
});

// API endpoint to vote for an entry
app.post('/vote', (req, res) => {
    const { entryId } = req.body;
    if (votes[entryId] !== undefined) {
        votes[entryId]++;
        res.status(200).send('Vote counted');
    } else {
        res.status(404).send('Entry not found');
    }
});

// API endpoint to get the start time (for timer)
app.get('/start-time', (req, res) => {
    res.json({ startTime });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
