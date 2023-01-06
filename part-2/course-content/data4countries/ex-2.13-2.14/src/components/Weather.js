import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current);
      });
// eslint-disable-next-line
  }, [])

    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature} Celsius
        </p>
        <img src={weather.weather_icons} alt="weather icon" />
        <p>
          <strong>wind:</strong> {weather.wind_speed} km/h direction{" "}
          {weather.wind_dir}
        </p>
      </div>
    )
};

export default Weather;