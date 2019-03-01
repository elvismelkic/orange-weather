import React from "react";
import CityInput from "./CityInput";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className="navbar">
      <Link className="navbar-header" to="/">
        Weather App
      </Link>
      <div>
        <CityInput direction="row" props={props} />
      </div>
    </div>
  );
}
