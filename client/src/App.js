import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Game from './components/pages/Game';

import TmtState from './context/TMT/TMTState';
import GameState from './context/game/GameState';

const App = () => {
  return (
    <TmtState>
      <GameState>
        <Router>
          <Fragment>
            <Navbar />
            {/* this container holds the stuff on screen below the navbar */}
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/game" component={Game} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </GameState>
    </TmtState>
  );
};

export default App;
