const WeatherInfoBody = ({ weatherData }) => (
    <>
        <div><b>Temperature: {weatherData.main.temp} Celcius</b></div><br/>
        <img 
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description}
        />
        <div><b>Wind: {weatherData.wind.speed} m/s</b></div>
    </>
)

export default WeatherInfoBody