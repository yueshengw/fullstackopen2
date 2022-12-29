import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
        personService
            .getAll()
            .then(personArray => {
                return personArray.every((person) => person.name !== name)
            })
            .catch(error => {
                console.log(error)
            })
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
            const personObject = persons.find(person => person.name === newName)
            const { id } = personObject

            if (personObject !== undefined && 
                window.confirm(`${newName} is already added to Phonebook, replace the old number with the new one?`)) {
                const updatedPersonObject = { ...personObject, number: newNumber}
                personService
                    .updatePerson(updatedPersonObject)
                    .then(response => {
                        setPersons(persons.map(person => {
                                return person.id !== id ?
                                person :
                                updatedPersonObject
                                }
                            )
                        )
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
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