require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token('body', function (req, res) {
  //console.log(JSON.stringify(req.body));
  return req.body !== {} ? JSON.stringify(req.body) : "{}";
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ];

app.get("/api/persons", (req, res) => {
	Person.find({})
		.then(persons => {
			res.json(persons);
		})
		.catch(error => {
			console.log("fetch failed");
			console.log(error.message);
            res.status(404).end();
		});
});

app.get("/info", (req, res) => {
    //const appInfo = `Phonebook has info for ${persons.length} people`;
    const timeInfo = new Date();
    console.log(timeInfo);
    res.send(`<p>${appInfo}</p><p>${timeInfo}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id.toString() === id);

  if (person) {
    res.send(person);
  }
  else {
    res.statusMessage = "no such id in database";
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id.toString() !== id);

  res.status(204).end();
});

const nameValidation = name => {
    // name needs to be truthy and unique to be true
    // return name && persons.every(person => person.name !== name);
    return Boolean(name);
};

const numberValidation = number => {
  // return boolean not number
  return Boolean(number);
};

const generateValidId = () => {
  let id = 1;
  // super inefficient
  while (persons.some(person => person.id === id)) {
    // 1, ..., 100
    id = Math.floor(Math.random() * 100) + 1;
  }
  return id;
};

app.post("/api/persons/", (req, res) => {
  // const id = generateValidId();
  const body = req.body;
  if (nameValidation(body.name) && nameValidation(body.number)) {
    const person = new Person({
      // "id": id,
      "name": body.name || "None",
      "number": body.number || "None"
    });
    // persons = persons.concat(person);
    
    person.save()
        .then(savedPerson => {
            res.json(savedPerson);
        })
        .catch(error => {
            console.log("saving failed");
            console.log(error.message);
            res.status(404).end();
        })
    
  }
  else {
    res.status(404).json({
      "error": body.number === 0
      ? "number is missing"
      // // // // // // // //
      : body.name.length > 1 
      ? "name must be unique"
      : "name is missing"
    });
  }

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});