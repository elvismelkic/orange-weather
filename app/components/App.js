import React from 'react';
import NavBar from './NavBar';
import MainContainer from './MainContainer';
import Forecast from './Forecast';
import DayDetails from './DayDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Switch>
            <Route exact path="/" component={MainContainer} />
            <Route path="/forecast" component={Forecast} />
            <Route path="/details" component={DayDetails} />
            <Route render={() => <p>Not Found</p>
            } />
          </Switch>
        </div>
      </Router>
    );
  }
};
