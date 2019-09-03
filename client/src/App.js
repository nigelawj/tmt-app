import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Game from './components/pages/Game';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import ResultsState from './context/results/ResultsState';
import GameState from './context/game/GameState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ResultsState>
        <GameState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                {/* this container holds the stuff on screen below the navbar */}
                <div className="container">
                  <Alerts></Alerts>
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </GameState>
      </ResultsState>
    </AuthState>
  );
};

export default App;
