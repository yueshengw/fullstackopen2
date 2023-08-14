const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app) // superagent object
const Note = require("../models/note")

mongoose.set("bufferTimeoutMS", 30000)

beforeEach(async () => {
    await Note.deleteMany({})

    await Note.insertMany(helper.initialNotes)
    // // specific execution order
    // for (let note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    // }

    // // execute in parallel
    // const noteObjects = helper.initialNotes
    //     .map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    // console.log("cleared")
    // helper.initialNotes.forEach(async (note) => {
    //     let noteObject = new Note(note)
    //     await noteObject.save
    //     console.log("saved")
    // })
    // console.log("done")

    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()

    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})
describe("when there is initially some notes saved", () => {
    test("notes are returned as json", async () => {
        // console.log("entered test")
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("all notes are returned", async () => {
        const response = await api.get("/api/notes")

        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test("a specific note is within the returned notes", async () => {
        const response = await api.get("/api/notes")

        const contents = response.body.map(r => r.content)

        expect(contents).toContain(
            "Browser can execute only JavaScript"
        )
    })
})

describe("viewing a specific note", () => {
    test("succeeds with a valid id", async () => { // "a specific note can be viewed"
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(resultNote.body).toEqual(noteToView)
    })

    test("fails with status code 404 if note does not exist", async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })

    test("fails with status code 400 if id is invalid", async () => {
        const validNonexistingId = "1"

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })
})

describe("addition of a new note", () => {
    test("succeeds with valid data", async () => { // "a valid note can be added"
        const newNote = {
            content: "async/await simplifies making async calls",
            important: true
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain(
            "async/await simplifies making async calls"
        )
    })

    test("fails with status code 400 if data invalid", async () => { // "note without content is not added"
        const newNote = {
            important: true
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(400)

        const notesAtEnd = await api.get("/api/notes")

        expect(notesAtEnd.body).toHaveLength(helper.initialNotes.length)
    })
})

describe("deletion of a note", () => {
    test("succeeds with status code 204 if id is valid", async () => { // "a note can be deleted"
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        )

        const contents = notesAtEnd.map(r => r.content)

        expect(contents).not.toContain(noteToDelete.content)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})