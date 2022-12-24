import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({ filterInput, handleFilterChange }) => {
    return (
        <form>
            <strong>Find countries:</strong> <input value={filterInput} onChange={handleFilterChange} />
        </form>
    )
}
const CountryInfo = ({ countryObject }) => {
    const countryLanguagesJSX = Object.values(countryObject.languages).map(
        language => <li key={language}><b>{language}</b></li>
    )

    return (
        <div key={countryObject.name.common}>
            <h2>{countryObject.name.common}</h2>
            <h3>Capital: {countryObject.capital}</h3>
            <h3>Area Code: {countryObject.idd.root+countryObject.idd.suffixes[0]}</h3>
            <h3>Languages:</h3>
            <ul>{countryLanguagesJSX}</ul>
        </div>
    )
}

const DisplayResult = ({ countries, filterInput }) => {
    const countryDisplayArray = countries.filter(country => 
        country.name.common.toLowerCase().includes(filterInput.toLowerCase())
    )
    
    /** The short circuit is to ensure the array length is 1
        so accessing index 0 won't cause an error. */
    const countryDisplayJSX = countryDisplayArray.length > 1 ?
        countryDisplayArray.map(
            country => <div key={country.name.common}><b>{country.name.common}</b></div>
        ) :
        countryDisplayArray.length === 1 && <CountryInfo countryObject={countryDisplayArray[0]} />

    return (
        <div>{
            filterInput.length > 0 ?
            countryDisplayJSX :
            <strong>Input to filter down</strong>
        }</div>
    )
}

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