import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

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
const CountryInfoBody = ({ countryObject, languagesJSX }) => (
    <>
        <h2>{countryObject.name.common}</h2>
        <h3>Capital: {countryObject.capital}</h3>
        <h3>Area Code: {countryObject.idd.root+countryObject.idd.suffixes[0]}</h3>
        <h3>Languages:</h3>
        <ul>{languagesJSX}</ul>
		<img src={countryObject.flags.png} alt={`${countryObject.name.common}'s flag`} />
		<br />
    </>
)

const CountryInfo = ({ countryObject, bool}) => {
    const [displayBool, setDisplayBool] = useState(bool)
	const [displayText, setDisplayText] = useState(!displayBool ? 'Collapse' : 'Show')

	//console.log(countryObject)
	useEffect(() => setDisplayBool(bool), [bool])
	
	//console.log(displayBool)
    const languagesJSX = Object.values(countryObject.languages).map(
        language => <li key={language}><b>{language}</b></li>
    )
    
	const displayJSX = (displayBool === false ? 
		<b>{countryObject.name.common} </b> : 
		<CountryInfoBody countryObject={countryObject} languagesJSX={languagesJSX} />
	)

	const handleDisplayButton = () => {
		setDisplayBool(!displayBool)
		setDisplayText(!displayBool ? 'Collapse' : 'Show')
	}

    return (
        <div key={countryObject.name.common}>
			{displayJSX}
            <button onClick={handleDisplayButton}>{displayText}</button>
        </div>
    )
}

const DisplayResult = ({ countries, filterInput }) => {
    const countryDisplayArray = countries.filter(country => 
        country.name.common.toLowerCase().includes(filterInput.toLowerCase())
    )
    
	const lengthOfDisplayArr = countryDisplayArray.length

    const countryDisplayJSX = countryDisplayArray.map(
		(country, i, a) => {
			//console.log('array', a, a.length, a.length===1)
			return <CountryInfo key={country.name.common} countryObject={country} bool={lengthOfDisplayArr===1} />
		}
	)

    // /** The short circuit is to ensure the array length is 1
    //     so accessing index 0 won't cause an error. */
    // const countryDisplayJSX = countryDisplayArray.length > 1 ?
    //     countryDisplayArray.map(
    //         country => <div key={country.name.common}><b>{country.name.common}</b></div>
    //     ) :
    //     countryDisplayArray.length === 1 && <CountryInfo countryObject={countryDisplayArray[0]} />

	// // Functional but difficult to read
	// (filterInput.length > 0 && lengthOfDisplayArr > 10) ?
	// <strong>Too many matches, specify another filter</strong> :
	// (filterInput.length > 0 && lengthOfDisplayArr > 0) ?
	// countryDisplayJSX :
	// (filterInput.length > 0 && lengthOfDisplayArr == 0) ?
	// <strong>No match, try another filter</strong> :
	// <strong>Input to filter down</strong>

	let whatToDisplay = <strong>Input to filter down</strong>

	if ((filterInput.length > 0 && lengthOfDisplayArr > 10)) {
		whatToDisplay = <strong>Too many matches, specify another filter</strong>
	} else if (filterInput.length > 0 && lengthOfDisplayArr > 0) {
		whatToDisplay = countryDisplayJSX
	} else if (filterInput.length > 0 && lengthOfDisplayArr == 0) {
		whatToDisplay = <strong>No match, try another filter</strong>
	}

    return (
        <div>
			{whatToDisplay}
		</div>
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