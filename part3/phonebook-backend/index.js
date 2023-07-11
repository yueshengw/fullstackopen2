require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("body", function (req, _res) {
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
	Person.find({})
		.then(persons => {
			const appInfo = `Phonebook has info for ${persons.length} people`;
			const timeInfo = new Date();
			console.log(timeInfo);
			res.send(`<p>${appInfo}</p><p>${timeInfo}</p>`);
		})
		.catch(() => {
			res.status(404).end();
		});
});

app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	//   const person = persons.find(person => person.id.toString() === id);
	Person.findById(id)
		.then(result => {
			if (result) {
				res.send(result);
			}
			else {
				res.statusMessage = "no such id in database";
				res.status(404).end();
			}
		})
		.catch(error => {
			next(error);
		});
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   persons = persons.filter(person => person.id.toString() !== id);

//   res.status(204).end();
// });

// eslint-disable-next-line no-unused-vars
const nameValidation = name => {
	return new Promise((resolve, _reject) => {
		// name needs to be truthy and unique to be true
		// return name && persons.every(person => person.name !== name);
		if (Boolean(name) === false) {
			resolve(false);
		}

		Person.find({})
			.then(result => {
				// console.log(result);
				console.log(result.every(person => {
					return person.name.toLocaleLowerCase() !== name.toLocaleLowerCase();
				}));
				resolve(result.every(person => {
					return person.name.toLocaleLowerCase() !== name.toLocaleLowerCase();
				}));
			})
			.catch(() => {
				resolve(false);
			});
	});
};

// eslint-disable-next-line no-unused-vars
const numberValidation = number => {
	// return boolean not number
	return Boolean(number);
};

// const generateValidId = () => {
// 	let id = 1;
// 	// super inefficient
// 	while (persons.some(person => person.id === id)) {
// 		// 1, ..., 100
// 		id = Math.floor(Math.random() * 100) + 1;
// 	}
// 	return id;
// };

// app.post("/api/persons/", (req, res) => {
//   // const id = generateValidId();
//   const body = req.body;
//   nameValidation(body.name).then(
//     result => {
//         if (result && numberValidation(body.number)) {
//             const person = new Person({
//               // "id": id,
//               "name": body.name || "None",
//               "number": body.number || "None"
//             });
//             // persons = persons.concat(person);

//             person.save()
//                 .then(savedPerson => {
//                     res.json(savedPerson);
//                 })
//                 .catch(error => {
//                     console.log("saving failed");
//                     console.log(error.message);
//                     res.status(404).end();
//                 })

//           }
//           else {
//             res.status(404).json({
//               "error": body.number === 0
//               ? "number is missing"
//               // // // // // // // //
//               : body.name.length > 1
//               ? "name must be unique"
//               : "name is missing"
//             });
//           }
//     }
//   );
// });

app.post("/api/persons/", (req, res, next) => {
	const body = req.body;
	const person = new Person({
		name: body.name,
		number: body.number
	});

	person.save()
		.then(savedPerson => {
			res.json(savedPerson);
		})
		.catch(error => {
			console.log("saving failed");
			console.log(error.message);
			// res.status(404).end();
			next(error);
		});
});

app.put("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	// const body = req.body;

	// const person = {
	//     name: body.name,
	//     number: body.number
	// }

	const { name, number } = req.body;

	Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: "query" })
		.then(updatedPerson => {
			res.json(updatedPerson);
		})
		.catch(error => {
			next(error);
		});
});

app.delete("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;

	Person.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end();
		})
		.catch(error => {
			next(error);
		});
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

function unknownEndpoint(req, res) {
	res.status(404).send({ error: "unkown endpoint" });
}

function errorHandler(error, req, res, next) {
	console.log(error.message);

	if (error.name === "CastError") {
		res.status(404).send({ error: "malformatted id" });
	}
	else if (error.name === "ValidationError") {
		res.status(404).json({ error: error.message });
	}
	next(error);
}