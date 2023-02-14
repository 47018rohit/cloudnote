const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: get all the notes using: GET '/api/notes/fetchallnotes' . No login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // finding notes for the particular id 
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})
// Route 2: add a new note using: POST '/api/notes/addnotes . no login required
router.post('/addnotes', fetchuser, [
    body('title', 'please enter valid title').exists(),
    body('description', 'description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body
    const errors = validationResult(req);
    // finding notes for the particular id 
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE 3: Updating the existing notes using: PUT '/api/notes/updateNotes' .Login required

router.put('/updateNotes/:id', fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            // create newNote object
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // find the note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send('Not found')
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowd")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })

//  ROUTE 4: delete Note using: DELETE '/api/notes/deleteNotes'

router.delete('/deleteNotes/:id', fetchuser,
    async (req, res) => {
        // const { title, description, tag } = req.body;
        try {
            // find the note to be deleted and delete it 
            let note = await Notes.findById(req.params.id)
            if (!note) {
                return res.status(404).send('Not found')
            }
            // Allow deletion only if the user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Notes has been deleted", note: note })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Internal Server Error')
        }
    })

module.exports = router