import CountryInfo from "./CountryInfo"

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
	} else if (filterInput.length > 0 && lengthOfDisplayArr === 0) {
		whatToDisplay = <strong>No match, try another filter</strong>
	}

    return (
        <div>
			{whatToDisplay}
		</div>
    )
}

export default DisplayResult