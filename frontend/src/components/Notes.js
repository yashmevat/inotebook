import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getNote,editNote } = context;
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
  const handleClick = (e) => {
    console.log("updating the note")
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("updated Successfully","success")
    refclose.current.click()
  }
  let navigate=useNavigate()
  const onChange = (e) => {
      //jo bhi change ho raha hbai uska name uske value ke equal ho jaaye
      setNote({ ...note, [e.target.name]: e.target.value })
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id ,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag})
    
  }
  useEffect(() => {
    if(localStorage.getItem("token"))
       getNote()
    else{
      props.showAlert("Please Login In To Continue","danger")
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="form-group my-3">
                  <label htmlFor="etitle">Add Title</label>
                  <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" placeholder="title" value={note.etitle} onChange={onChange} />
                </div>

                <div class="form-group my-3">
                  <label htmlFor="edescription">Add description</label>
                  <textarea className="form-control" id="edescription" name="edescription" rows="3" placeholder="description" value={note.edescription} onChange={onChange} ></textarea>
                </div>

                <div class="form-group my-3">
                  <label htmlFor="etag">Add Tag</label>
                  <textarea className="form-control" id="etag" name="etag" rows="3" placeholder="tag" value={note.etag} onChange={onChange} ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h1 className='my-3'>Your Notes</h1>
      <div className="row mx-3 my-3">
       {notes.length===0 && 'No Notes To Display'}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>

  )
}

export default Notes
