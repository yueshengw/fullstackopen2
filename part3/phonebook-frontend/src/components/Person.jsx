const Person = ({ person, handleDelete }) => (
    <>
        <span key={person.id}>{person.name} {person.number}</span> <button onClick={() => handleDelete(person)}>Delete</button><br/>
    </>
)

export default Person