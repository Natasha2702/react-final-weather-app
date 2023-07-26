import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
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
        <div className="container">
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
        </div>
        <WeatherInfo data={weatherData} />
        <br />

        <footer class="mt-5">
          <div class="footer-header">
            <div>
              <p>
                Made by Natasha <br />
                <a
                  href="https://github.com/Natasha2702/week-5-homework"
                  target="_blank"
                  rel="noreferrer"
                >
                  open-sourced on github
                </a>{" "}
                and{" "}
                <a
                  href="https://rococo-axolotl-5f8766.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hosted on Netlify
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
