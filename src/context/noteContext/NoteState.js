import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const allNotes = []
  const [notes, setNotes] = useState(allNotes)

  // GET ALL NOTEs
  const getAllNote = async () => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  }


  // ADD NOTE
  const addNote = async (title, description, tag) => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // DELETE NOTE
  const deleteNote = async (id) => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify()
    });
    const responseData = response.json();

    //   front-end
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    //  API CALL - editing in back
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const responseData = response.json();

    const newNotes = JSON.parse(JSON.stringify(notes))
    //   Editing in front
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i]
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, getAllNote, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;