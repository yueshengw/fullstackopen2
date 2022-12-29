import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, inputHandler }) => {
    return (
        <div>Filter shown with: <input value={value} onChange={inputHandler} /></div>
    )
}

const Person = ({ person, handleDelete }) => (
    <>
        <div key={person.id}>{person.name} {person.number}</div> <button onClick={() => handleDelete(person)}>delete</button>
    </>
)

const Persons = ({ persons, filterInput, handleDelete }) => {

    return (
        persons.map(
            (person) => person.name.toLowerCase().includes(filterInput) && 
            <Person
                key={person.name}
                person={person}
                handleDelete={handleDelete}
            />
        )
    )
}

const PersonForm = ({ formValues, formHandlers }) => {
    return (
        <>
            <form onSubmit={formHandlers.addPerson}>
            <div>
                Name: <input required value={formValues.newName} onChange={formHandlers.handleNameChange} />
            </div>
            <div>
                Number: <input required value={formValues.newNumber} onChange={formHandlers.handleNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
            </form>
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initArray => {
                setPersons(initArray)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleDelete = (person) => {
        const { id, name } = person
        if (window.confirm(`Delete ${name}?`)) {
            personService
            .deletePerson(id)
                .then(response => 
                    setPersons(persons.filter(person => person.id !== id))
                )
                .catch(error => {
                    personService
                        .getAll()
                        .then(personArray => {
                            if (personArray.find(person => person.id === id) === undefined) {
                                alert(`The person '${name}' was already deleted`)
                            }
                            else {
                                console.log(error)
                            }
                        })
                        .catch(error => console.log(error))
                })
        }
    }

    const validate = (name) => {
        return persons.every((person) => person.name !== name)
    }
    
    const addPerson = (event) => {
        event.preventDefault()
        if (validate(newName)) {
            const newPerson = {
                'name': newName,
                'number': newNumber,
                'id': persons.length + 1
            }

            personService
                .addPerson(newPerson)
                .then(personObject => {
                    setPersons(persons.concat([
                        personObject
                    ]))
                })

            setNewName('')
            setNewNumber('')
        }
        else {
            alert(`${newName} is already added to Phonebook`)
        }
    }

    const formValues = { newName, newNumber }
    const formHandlers = { handleNameChange, handleNumberChange, addPerson }
    
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                value={filterInput}
                inputHandler={handleFilterChange} 
            />
            <h2>Add New</h2>
            <PersonForm 
                formValues={formValues}
                formHandlers={formHandlers}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filterInput={filterInput} 
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default App