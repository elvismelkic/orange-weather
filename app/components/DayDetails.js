import React from "react";
import PropTypes from "prop-types";
import WeatherDescription from "./WeatherDescription";
import WeatherInfo from "./WeatherInfo";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default function DayDetails({ location }) {
  const {
    state: { day, cityName },
    search
  } = location;
  return (
    <div className="day-details">
      <h1 className="forecast-header">{cityName}</h1>
      <div className="card">
        <WeatherDescription day={day} />
        <WeatherInfo day={day} />
        <Link
          className="go-back-button"
          to={{
            pathname: "/forecast",
            search: "?city=" + queryString.parse(search).city
          }}
        >
          GO BACK
        </Link>
      </div>
    </div>
  );
}
