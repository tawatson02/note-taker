const express = required('express');
const path = require('path');
const api = require('./routes/index.js');
//A more flexible way to set the PORT environment
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'));

// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Get route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
//Starts the Express server on the specified PORT and logs the message
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
});
