import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import DisplayResult from './components/DisplayResult'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterInput, setFilterInput] = useState('')
    
    const APIURL = 'https://restcountries.com/v3.1/all'

    useEffect(() => {
        axios
            .get(APIURL)
            .then(response => {
                console.log(response.data)
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    return (
        <div>
            <h1>Country Search</h1>
            <FilterForm filterInput={filterInput} handleFilterChange={handleFilterChange} />
            <DisplayResult countries={countries} filterInput={filterInput} />
        </div>
    )
}

export default App