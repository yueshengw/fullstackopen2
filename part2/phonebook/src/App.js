import { useState } from 'react'

const Filter = ({ value, inputHandler }) => {
    return (
        <div>Filter shown with: <input value={value} onChange={inputHandler} /></div>
    )
}

const Persons = ({ persons, filterInput }) => {
    return (
        persons.map(
            (person) => person.name.toLowerCase().includes(filterInput) && 
            <div key={person.id}>{person.name} {person.number}</div>
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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterInput, setFilterInput] = useState('')

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
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
            setPersons(persons.concat([
                newPerson
            ]))
            setNewName('')
            setNewNumber('')
        }
        else {
            alert(`${newName} is already added to Phonebook`)
        }
    }
    const formValues = [newName, newNumber]
    const formHandlers = [handleNameChange, handleNumberChange, addPerson]
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
            />
        </div>
    )
}

export default App