import { useState } from "react";
import NoteContext from "./noteContext";
const host="http://localhost:5000";
 const NoteState = (props)=>{
   const notesInitial=[]
const [notes,setNotes] = useState(notesInitial)

//getallnotes
const getNote=async ()=>{
  
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
         headers: {
           "Content-Type": "application/json",
           "auth-token":localStorage.getItem("token")
         }
       });
       const json= await response.json();
       setNotes(json)
}


//addnotes
const addNote=async (title,description,tag)=>{

    const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
         headers: {
           "Content-Type": "application/json",
           "auth-token":localStorage.getItem("token")
         },
         body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
       });
       const note= await response.json(); 
    setNotes(notes.concat(note))
}


//delete notes
const deleteNote=async(id)=>{
   await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
         headers: {
           "Content-Type": "application/json",
           "auth-token":localStorage.getItem("token")
         }
       });
    const newNotes=notes.filter((note)=>{
       return note._id!==id
    })
    setNotes(newNotes)
}

const editNote= async(id,title,description,tag)=>{
    //API call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
       method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      // const json= response.json(); 
    let newNotes = JSON.parse(JSON.stringify(notes))
    //LOgic to edit
    for(let index = 0 ; index< newNotes.length ; index++)
    {
        // const element = notes[index];
        if(newNotes[index]._id===id){
          newNotes[index].title=title
          newNotes[index].description=description
          newNotes[index].tag=tag
          break;
        }
    }
    setNotes(newNotes);
}

return (
    <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNote}}>
         {props.children}
    </NoteContext.Provider>
  )
 }

 export default NoteState