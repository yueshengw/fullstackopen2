const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give a password as an argument");
    process.exit(1);
}
else {
    connectToDataBase("user1", process.argv[2]);
}

if (process.argv.length == 3) {
    getCollection();
}
else if (process.argv.length == 5) { // add resource
    createResource();
}
else {
    console.log("invalid entry, both name and number is needed");
    process.exit(1);
}

function connectToDataBase(username, password) {
    const url = `mongodb+srv://${username}:${password}@p3exercisebackend.xr2rxub.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", false);
    mongoose.connect(url).catch(error => {
        console.log("connection failed");
        process.exit(1);
    });
}

function createResource() {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });
    const Person = mongoose.model("Person", personSchema);

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    }).catch(error => {
        console.log(error);
        mongoose.connection.close();
        process.exit(1);
    });
}

function getCollection() {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });
    const Person = mongoose.model("Person", personSchema);
    
    Person.find({}).then(persons => {
        if (persons.length > 0) {
            console.log("phonebook:");
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });
        }
        else {
            console.log("phonebook is empty");
        }
        mongoose.connection.close();
    }).catch(error => {
        console.log("fetch failed");
        mongoose.connection.close();
        process.exit(1);
    });
}