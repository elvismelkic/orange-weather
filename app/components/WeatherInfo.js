import React from "react";
import PropTypes from "prop-types";

export default function WeatherInfo({
  day: { description, temp_min, temp_max, humidity }
}) {
  return (
    <div className="weather-info">
      <p className="weather-text">{description}</p>
      <p className="weather-text">{`min. temp: ${temp_min} °C`}</p>
      <p className="weather-text">{`max. temp: ${temp_max} °C`}</p>
      <p className="weather-text">{`humidity: ${humidity} %`}</p>
    </div>
  );
}
