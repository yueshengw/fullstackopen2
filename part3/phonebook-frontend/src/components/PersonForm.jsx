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

export default PersonForm