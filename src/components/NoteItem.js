import React, { useContext } from 'react'
import noteContext from '../context/noteContext/noteContext'

export default function NoteItem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context

    const { note, updateNote, showAlert } = props

    const handleDelete = () => {
        showAlert("Note deleted" , "success")
        deleteNote(note._id)
    }

    return (
        <div className="card " >
            <div className="card-body">
                <span className="badge text-bg-info">{note.tag}</span>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className='d-flex align-itmes-center'>
                    <i className="fa-solid fa-pen-to-square me-3" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-solid fa-trash-can ms-3" onClick={handleDelete}></i>
                </div>
            </div>
        </div>
    )
}
