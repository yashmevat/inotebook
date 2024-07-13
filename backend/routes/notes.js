const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router()
const { body,validationResult } = require("express-validator");
const Note = require("../models/Note")
//route 1 get all the notes of a logged in user using get request
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnotes', fetchuser , [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await notes.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//ROUT 3 update a note login required here also /PUT request is used here
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
   const {title,description,tag} = req.body;
   try {
    //new empty note
    const newNote = {};
    if(title){
       newNote.title=title
    }  
    if(description){
        newNote.description=description
     }
    if(tag){
        newNote.tag=tag
     }  
   //find the note to be updated and update it
   let note = await Note.findById(req.params.id)
   if(!note){
    return res.status(404).send("not found");
   }
   if(note.user.toString() !== req.user.id)
   {
    return res.status(404).send("not allowed");
   }
   note = await Note.findByIdAndUpdate(req.params.id ,{$set : newNote} , {new : true});
   res.json({note})

}
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
  
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        console.log(note)
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            console.log(note.user.toString())
            console.log(req.user.id)
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router