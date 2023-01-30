import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const allNotes = [
        {
            "_id": "63d23a8590e2a50a9dd3a716",
            "user": "63cfb4d4621c7bf29e4f26a5",
            "title": "my title",
            "description": "learn web development daily",
            "tag": "personal",
            "date": "2023-01-26T08:32:05.619Z",
            "__v": 0
        },
        {
            "_id": "63d23a8690e2a50a9dd3a718",
            "user": "63cfb4d4621c7bf29e4f26a5",
            "title": "my title",
            "description": "learn web development daily",
            "tag": "personal",
            "date": "2023-01-26T08:32:06.124Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(allNotes)

    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;