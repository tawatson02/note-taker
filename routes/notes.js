const express = require('express');
const {v4: uuidv4} = require('uuid');
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')

const notesRouter = express.Router();

notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then(data =>res.json(JSON.parse(data)))
        .catch(err => res.status(500).json({error : 'Server Error'}));
});

notesRouter.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('.db/db.json')
        .then(data => res.json(JSON.parse(data)))
        .then(notes => {
            const note = notes.find(note => note.id === noteId);
            if (!note) {
                res.status(404).json({error : 'Note not found'});
            } else {
                res.json(note);
            }
        })
        .catch(err => res.status(500).json({error : 'Server Error'}));
    
});

notesRouter.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(notes => {
        const updatedNotes = notes.filter(note => note.id === noteId);
        writeToFile('./db/db.json', updatedNotes);
        res.json({message : `Note ${noteId} has been deleted`});
    })
    .catch(err => res.status(500).json({error : 'Server Error'}));
});

notesRouter.post('/', (req, res) => {
    const {title, text} = req.body;
        if (!title || !text) {
            return res.status(400).json({error : 'Title and Text are required'});
        }
    const newNote ={title, text, id: uuidv4(), };
    readAndAppend(newNote, './db/db.json')
    .then(() => res.status (201).json (newNote))
    .catch(err => res.status(500).json({error : 'Server Error'}));
});

module.exports = notesRouter;