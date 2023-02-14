import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/noteContext/noteContext'
import NoteItem from './NoteItem';
import AddNotes from './AddNotes'
import { useEffect } from 'react';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getAllNote, editNote } = context;
    const {showAlert} = props;

    useEffect(() => {
        getAllNote()
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = (e) => {
        showAlert("Changes Saved", 'success')
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNotes showAlert={showAlert} />

            <div className='modal-container'>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className=''>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" name='etitle' id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" name='etag' className="form-control" id="etag" value={note.etag} onChange={onchange} />
                                    </div>
                                    <textarea className="form-control my-2" name='edescription' id="edescription" placeholder='Description' rows="10" value={note.edescription} onChange={onchange}></textarea>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" disabled={note.etitle.length< 4 || note.edescription.length< 5} onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='' >
                <h2 className='mt-5'>Your Notes</h2>
                <div className="container row">
                    {notes.length === 0 && 'No Notes Added yet'}
                    {notes.map((note) => {
                        return <div className='col-md-3 mx-2' key={note._id}>
                            <NoteItem note={note} updateNote={updateNote} showAlert={showAlert} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
