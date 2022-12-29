import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
        console.log(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        // const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changeNote = { ...note, important: !note.important }

        noteService
            .update(id, changeNote)
            .then(returnedNote => {
                setNotes(notes.map(
                    n => n.id !== id ? n : returnedNote
                ))
            })
            .catch(error => {
                alert(
                    `The note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }
        
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => 
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} placeholder='a new note ...' />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App