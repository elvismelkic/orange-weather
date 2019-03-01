import React from "react";
import PropTypes from "prop-types";
import { getDate } from "../utils/helpers.js";

export default function WeatherDescription({ day: { icon, dt } }) {
  return (
    <div className="weather-description">
      <img
        className="weather-icon"
        src={`../../images/weather-icons/${icon}.svg`}
        alt="Weather"
      />
      <p className="weather-text">{getDate(dt)}</p>
    </div>
  );
}

WeatherDescription.propTypes = {
  day: PropTypes.object.isRequired
};
