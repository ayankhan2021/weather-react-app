import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API = {
    KEY: "4e213523a977c983df7dbde4e89c5739",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  const fetchWeather = () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    fetch(`${API.url}weather?q=${city}&units=metric&appid=${API.KEY}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === 200) {
          setWeather(result);
          setError(""); // Clear any previous error
        } else {
          setError("City not found.");
          setWeather(null);
        }
        setCity("");
      })
      .catch(() => {
        setError("Failed to fetch weather data.");
        setWeather(null);
      });
  };

  return (
    <div className="app">
      <div className="weatherlogo"><img src="weather_logo.jpg" alt="" /></div>
      <h1 className="title">Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && weather.sys && weather.main && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
