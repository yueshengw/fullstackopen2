const FilterForm = ({ filterInput, handleFilterChange }) => {
	const handleSubmit = (event) => {
		event.preventDefault()
	}

    return (
        <form onSubmit={handleSubmit}>
            <strong>Find countries:</strong> <input value={filterInput} onChange={handleFilterChange} />
        </form>
    )
}

export default FilterForm