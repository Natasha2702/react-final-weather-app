import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleChangeCity(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "e6taed4cb9ef5dfoaff8f35a499504ef";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="WeatherApp">
        <div className="container mt-3">
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input w-80"
                onChange={handleChangeCity}
              />
              <input
                type="submit"
                value="Search"
                className="btn btn-primary col-4"
              />
            </div>
          </form>

          <WeatherInfo data={weatherData} />
          <br />
          <h3>Forecast for the week</h3>
          <div className="forecast mt-1 mb-1">
            <WeatherForecast
              coordinates={weatherData.coordinates}
              city={weatherData.city}
            />
          </div>
        </div>

        <footer class="mt-4">
          <div class="footer-header">
            <div>
              <p>
                👩🏾‍💻 Coded by Natasha, it is open-sourced on <br />
                <a
                  href="https://github.com/Natasha2702/react-final-weather-app"
                  target="_blank"
                  rel="noreferrer"
                >
                  github
                </a>{" "}
                and hosted on{" "}
                <a
                  href="https://voluble-salmiakki-673f0c.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Netlify
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  } else {
    search();
    return `Loading ${city} Weather Forecast...`;
  }
}
