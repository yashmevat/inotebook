import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
const Home = (props) => {
  const context = useContext(noteContext)
  const { notes, setNotes } = context;
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home