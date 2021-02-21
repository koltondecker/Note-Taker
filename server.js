//Dependencies
const express = require('express');
const path = require('path');

//Set us express app and declare port number
const app = express();
const PORT = process.env.PORT || 3000;

//Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes 

//Route to index html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Route to notes html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


// Starts server to begin listening. 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));