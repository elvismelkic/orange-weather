import React from "react";
import CityInput from "./CityInput";

export default function MainContainer(props) {
  return (
    <div className="main-container">
      <h1 className="container-header">Enter a City and State</h1>
      <div>
        <CityInput direction="column" />
      </div>
    </div>
  );
}
