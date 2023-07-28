const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);

const password = process.argv[2]

const url = `mongodb+srv://user1:${password}@p3classbackend.5shiohc.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url).catch(() => {
    console.log("connection failed")
    process.exit(1)
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

// const note = new Note({
//     content: "HTML is easy",
//     important: false,
// });

// note.save().then(result => {
//     console.log("note saved!");
//     mongoose.connection.close();
// }).catch(error => {
//     console.log("saving failed :(");
//     console.log(error);
//     process.exit(1);
// })

Note.find({ important: false }).then(result => {
    console.log("fetch successful")
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
}).catch(error => {
    console.log("fetch failed")
    console.log(error)
    mongoose.connection.close()
    process.exit(1)
})