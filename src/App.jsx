import React, { useState } from "react";
import "./App.css";

const baseEndpoint =
  "https://api.weatherapi.com/v1/current.json?key=dc17ee14014b4ff2a9c132431230306&q=";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const searchHandler = async () => {
    setLoading(true); // start loading
    try {
      const [response] = await Promise.all([
        fetch(`${baseEndpoint}${city}`),
        delay(2000), // ensure minimum 2-second delay
      ]);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        console.log(data);
      } else {
        window.alert("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false); // only after 2 seconds
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <div>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchHandler}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weatherData && !loading && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <p>{weatherData?.current?.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <p>{weatherData?.current?.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <p>{weatherData?.current?.condition?.text}</p>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <p>{weatherData?.current?.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
