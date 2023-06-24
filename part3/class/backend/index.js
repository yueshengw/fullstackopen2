require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const Note = require("./models/note")

app.use(cors())
app.use(express.json())
// why this work. magic duh XD
// function declaration are processed before code block is executed
// function expression/arrow function will not work though
app.use(requestLogger)
app.use(express.static('build'))

function requestLogger(request, response, next) {
    console.log("Method:", request.method)
    console.log("Path:  ", request.path)
    console.log("Body:  ", request.body)
    console.log("---")
    next()
}

// Mongoose definitions
// mongoose.set("strictQuery", false);
// const url = `mongodb+srv://user1:${process.env.USER1PASSWORD}@p3classbackend.5shiohc.mongodb.net/noteApp?retryWrites=true&w=majority`;

// mongoose.connect(url).catch(error => {
//     console.log("connection failed");
//     process.exit(1);
// });

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// });

// noteSchema.set("toJSON", {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model("Note", noteSchema);

// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ]

app.get("/", (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get("/api/notes", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id // can use Number() but can't guarantee id can evaluate to a number and might result in NaN
    // const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    //     return note.id === id
    // })
    // const note = notes.find(note => note.id.toString() === id)
    // console.log(note)

    // if (note) {
    //     response.json(note)
    // }
    // else {
    //     response.statusMessage = "id not found in the notes collection"
    //     response.status(404).end()
    // }
    Note.findById(id).then(note => {
        response.json(note)
    })
})

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id.toString() !== id)

    response.status(204).end()
})

// app.post("/api/notes", (request, response) => {
//     const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0

//     // console.log(request.get("content-type"))
//     // console.log(request.headers["content-type"])
//     // console.log(request.headers)
//     const note = request.body
//     note.id = maxId + 1
    
//     notes = notes.concat(note)

//     response.json(note)
// })

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post("/api/notes", (request, response) => {
    const body = request.body

    if (!body.content) {
        // response.status(400).end()
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        // id: generateId(),
    })
    // notes = notes.concat(note)

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})