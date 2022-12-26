import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import WeatherInfoBody from './WeatherInfoBody'

const CountryInfoBody = ({ countryObject, languagesJSX }) => {
    const [weatherData, setWeatherData] = useState(null)
    const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${countryObject.capital} \
                           &units=metric&appid=${process.env.REACT_APP_API_KEY}`
    
    useEffect(() => {
        axios
            .get(weatherAPIURL)
            .then(response => setWeatherData(response.data))
    // Not need to list weatherAPIURL as a dependency; It won't change during runtime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherAPIURL])

    return (
        <>
            <h2>{countryObject.name.common}</h2>
                <h3>Capital: {countryObject.capital}</h3>
                <h3>Area Code: {countryObject.idd.root+countryObject.idd.suffixes[0]}</h3>
                <h3>Languages:</h3>
                    <ul>{languagesJSX}</ul>
            <img
                src={countryObject.flags.png} 
                alt={`${countryObject.name.common}'s flag`} 
            />
            <h3>Weather in {countryObject.capital}</h3>
                {
                    weatherData!=null ?
                    <WeatherInfoBody weatherData={weatherData} /> :
                    <b>Loading ...</b>
                }
            <br />
        </>
    )
}

export default CountryInfoBody