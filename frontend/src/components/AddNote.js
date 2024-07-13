import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully","success")
    }
    const onChange = (e) => {
        //jo bhi change ho raha hbai uska name uske value ke equal ho jaaye
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">Add Title</label>
                    <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" placeholder="title" onChange={onChange} 
                    value={note.title}/>
                </div>

                <div class="form-group my-3">
                    <label htmlFor="description">Add description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" placeholder="description" onChange={onChange} value={note.description}></textarea>
                </div>

                <div class="form-group my-3">
                    <label htmlFor="tag">Add Tag</label>
                    <input className="form-control" id="tag" name="tag" placeholder="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" disabled = {note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
