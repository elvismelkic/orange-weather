import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { fetchFiveDayWeather } from "../utils/api.js";
import { Link } from "react-router-dom";
import WeatherDescription from "./WeatherDescription";
import WeatherInfo from "./WeatherInfo";

export default class Forecast extends React.Component {
  state = {
    cityWeather: null,
    loading: true,
    city: null,
    error: null
  };

  updateCity = async () => {
    const parsedCity = queryString.parse(this.props.location.search).city;

    this.setState(() => ({ loading: true }));
    try {
      const response = await fetchFiveDayWeather(parsedCity);

      response.cod >= 400 && response.cod <= 600
        ? this.setState(() => ({ error: "The city does not exist." }))
        : this.setState(() => ({
            cityWeather: response,
            loading: false,
            error: null
          }));
    } catch (error) {
      console.log(error);
      this.setState(() => ({
        error: "There was a problem with your request. Please, try again."
      }));
    }
  };

  componentDidMount() {
    this.updateCity();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextCity;
    const nextCityArr = queryString
      .parse(nextProps.location.search)
      .city.split(", ");

    nextCity =
      nextCityArr.length > 1
        ? `${nextCityArr[0]}, ${nextCityArr[1]}`
        : `${nextCityArr[0]}`;

    return nextCity !== prevState.city ? { city: nextCity } : null;
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.city !== prevState.city ? this.updateCity() : null;
  }

  render() {
    const { error, loading, cityWeather } = this.state;
    return (
      <div>
        {error !== null ? (
          <div className="five-day-forecast">
            <h1 className="forecast-header">{error}</h1>
          </div>
        ) : loading === false ? (
          <div className="five-day-forecast">
            <h1 className="forecast-header">{cityWeather.cityName}</h1>
            <div className="card">
              <WeatherDescription day={cityWeather.currentWeather} />
              <WeatherInfo day={cityWeather.currentWeather} />
            </div>

            <ul className="five-day-list">
              {cityWeather.futureWeather.map(day => {
                return (
                  <li key={day.dt}>
                    <Link
                      className="detail-link"
                      to={{
                        pathname: "/details",
                        search: `?city=${
                          queryString.parse(this.props.location.search).city
                        }`,
                        state: { day, cityName: cityWeather.cityName }
                      }}
                    >
                      <WeatherDescription day={day} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <h1 className="forecast-header">LOADING</h1>
        )}
      </div>
    );
  }
}
