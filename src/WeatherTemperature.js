import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");
  function convertToFahreinheit(event) {
    event.preventDefault();
    setUnit("fahreinheit");
  }
  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  if (unit === "celsius") {
    return (
      <div className="Conversion">
        <strong id="temperature">{Math.round(props.celsius)}</strong>
        <span className="units">
          °C|
          <a
            href="/"
            onClick={convertToFahreinheit}
            id="celsius-link"
            rel="noopener noreferrer"
          >
            °F
          </a>
        </span>
      </div>
    );
  } else {
    let fahreinheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="Conversion">
        <strong id="temperature">{Math.round(fahreinheit)}</strong>
        <span className="units">
          <a
            href="/"
            onClick={convertToCelsius}
            id="fahrenheit-link"
            rel="noopener noreferrer"
          >
            °C
          </a>
          |°F
        </span>
      </div>
    );
  }
}
