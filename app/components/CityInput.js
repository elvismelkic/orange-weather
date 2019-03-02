import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class CityInput extends React.Component {
  static propTypes = {
    direction: PropTypes.string.isRequired
  };
  state = {
    city: ""
  };
  handleChange = event => {
    const value = event.target.value;

    this.setState(() => ({ city: value }));
  };
  handleSubmit = event => {
    const parsedCity = queryString.parse(this.props.location.search).city;

    parsedCity === this.state.city.toLowerCase()
      ? event.preventDefault()
      : null;
  };

  render() {
    return (
      <form
        action="/forecast"
        className={this.props.direction}
        onSubmit={this.handleSubmit}
      >
        <input
          className="input-field"
          type="text"
          name="city"
          placeholder="Atlanta, Georgia"
          value={this.state.city}
          onChange={this.handleChange}
        />
        <Link
          className="get-weather-button"
          to={{
            pathname: "/forecast",
            search: "?city=" + window.encodeURI(this.state.city.toLowerCase())
          }}
        >
          Get Weather
        </Link>
      </form>
    );
  }
}

export default withRouter(CityInput);
