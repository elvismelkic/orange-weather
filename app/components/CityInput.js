import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
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
  enterPress = event => {
    if (event.keyCode === 13) {
      console.log("pressed enter");
    }
  };

  render() {
    return (
      <div className={this.props.direction}>
        <input
          className="input-field"
          type="text"
          name="city"
          placeholder="Atlanta, Georgia"
          value={this.state.city}
          onChange={this.handleChange}
          onKeyUp={this.enterPress}
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
      </div>
    );
  }
}

export default withRouter(CityInput);
