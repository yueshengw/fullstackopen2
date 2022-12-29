const Filter = ({ value, inputHandler }) => {
    return (
        <div>Filter shown with: <input value={value} onChange={inputHandler} /></div>
    )
}

export default Filter