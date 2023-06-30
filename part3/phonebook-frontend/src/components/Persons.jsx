import Person from "./Person"

const Persons = ({ persons, filterInput, handleDelete }) => {

    return (
        persons.map(
            (person) => person.name.toLowerCase().includes(filterInput) && 
            <Person
                key={person.id}
                person={person}
                handleDelete={handleDelete}
            />
        )
    )
}

export default Persons