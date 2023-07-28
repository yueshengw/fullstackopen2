const mongoose = require("mongoose")
const config = require("./utils/config")

mongoose.set("strictQuery", false)
mongoose.connect(config.MONGODB_URI).catch(() => {
    console.log("connection failed")
    process.exit(1)
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
    content: "HTML is easy 1",
    important: false,
})

note.save().then(result => {
    console.log("note saved!")
    mongoose.connection.close()
}).catch(error => {
    console.log("saving failed :(")
    console.log(error)
    process.exit(1)
})

// Note.find({ important: false }).then(result => {
//     console.log("fetch successful")
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// }).catch(error => {
//     console.log("fetch failed")
//     console.log(error)
//     mongoose.connection.close()
//     process.exit(1)
// })