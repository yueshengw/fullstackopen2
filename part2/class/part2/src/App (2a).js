import Note from './components/Note'
const App = ({ notes }) => {
    // const { notes } = props

    // notes.map(note => note.id)
    // // is the same as
    // notes.map(note => {
    //     return note.id
    // })
    // const notes_arr = notes.map(notes => <li>{notes.content}</li>)
    // console.log(typeof notes_arr[0])

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
        </div>
    )
}

export default App