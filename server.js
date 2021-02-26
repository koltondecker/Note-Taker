//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

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

//Route to get notes json database file
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

//Routes to public path in order to link stylesheet for notes.html file
app.use(express.static(__dirname + '/public'));

//Post data to notes api file
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.id = uuidv4();
    console.log(newNote);

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {

        if (err) throw err;
        console.log("New note has been added!");

    });

    res.send(newNote);
});


app.delete('/api/notes/:id', (req, res) => {
    const reqId = req.params.id;

    for (let note of db) {
        if(reqId === note.id) {

            db.splice(db.indexOf(note), 1);

            fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {

                if (err) throw err;
                console.log("Note has been deleted!");
        
            });
        }
    }
    res.end();
});

// Starts server to begin listening. 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));