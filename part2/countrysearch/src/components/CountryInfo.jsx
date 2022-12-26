import { useState } from 'react'
import { useEffect } from 'react'
import CountryInfoBody from './CountryInfoBody'

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

export default CountryInfo