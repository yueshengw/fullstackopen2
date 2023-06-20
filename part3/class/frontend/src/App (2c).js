import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, [])
    
    console.log('reader', notes.length, 'notes')
    
    // // Alternative 1
    // const hook = () => {
    //     console.log('effect')
    //     axios
    //         .get('http://localhost:3001/notes')
    //         .then(response => {
    //             console.log('promise fulfilled')
    //             setNotes(response.data)
    //         })
    // }
    // useEffect(hook, [])

    // // Alternative 2
    // useEffect(() => {
    //     console.log('effect')

    //     const eventHandler = response => {
    //         console.log('promise fulfilled')
    //         setNotes(response.data)
    //     }

    //     const promise = axios.get('http://localhost:3001/notes')
    //     promise.then(eventHandler)
    // }, [])

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
        console.log(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }
        
        setNotes(notes.concat(noteObject))
        setNewNote('')
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
                    <Note key={note.id} note={note} />
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