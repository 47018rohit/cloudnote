import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext/noteContext';


export default function AddNotes(props) {
  const context = useContext(noteContext)
  const {addNote} =context;
  const {showAlert} = props

  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const handleClick = (e) => {
    e.preventDefault()
    showAlert("Note Added", 'success')
    addNote(note.title,note.description,note.tag)
    setNote({title: "", description: "", tag: ""})
  }
  const onchange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div className="container mb-3">
      <h2>Add Notes</h2>
      <form className=''>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name='title' id="title" aria-describedby="emailHelp" value={note.title} onChange={onchange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" name='tag' className="form-control" id="tag" value={note.tag} onChange={onchange} />
        </div>
        <textarea className="form-control my-2" name='description' id="description" placeholder='Description' rows="10" value={note.description} onChange={onchange} ></textarea>
        <input type='submit' className="btn btn-primary my-2" onClick={handleClick} value='Add Note' disabled={note.title.length< 4 || note.description.length< 5} / >
      </form>
    </div>
  )
}
