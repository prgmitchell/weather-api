import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [unitSystem, setUnitSystem] = useState("imperial");

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0a858098a515e16d7e54cb75b4508e20&units=${unitSystem}`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };

    fetchWeather();
  }, [location, unitSystem]);

  const handleUnitChange = (e) => {
    setUnitSystem(e.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weather) {
    return (
      <div>
        Enter a location and press the submit button to retrieve weather data.
      </div>
    );
  }

  return (
    <div>
      <div className="unitSelection">
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unitSystem === "imperial"}
            onChange={handleUnitChange}
          />
          <span className="unitLabel">Imperial</span>
        </label>
        <label>
          <input
            type="radio"
            value="metric"
            checked={unitSystem === "metric"}
            onChange={handleUnitChange}
          />
          <span className="unitLabel">Metric</span>
        </label>
      </div>
      <div className="weather-info">
        {weather && (
          <div className="weather-content">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <hr></hr>
            <p>Temperature: {weather.main.temp}°F</p>
            <p>Min Temperature: {weather.main.temp_min}°F</p>
            <p>Max Temperature: {weather.main.temp_max}°F</p>
            <p>Feels like: {weather.main.feels_like}°F</p>
            <p>Weather: {weather.weather[0].main}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Pressure: {weather.main.pressure}</p>
            <p>Wind Speed: {weather.wind.speed}mph</p>
            <p>Wind Direction: {weather.wind.deg}°</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
