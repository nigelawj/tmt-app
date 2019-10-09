import React, { useContext, useEffect, Fragment } from 'react';
import background from '../game/background.jpg';

import GameNav from '../../components/layout/GameNav';
import Button from '../game/Button';

import './Game.css';

import GameContext from '../../context/game/gameContext';
import ResultContext from '../../context/results/resultsContext';
import AuthContext from '../../context/auth/authContext';

import ResultItem from '../results/ResultItem';
import Spinner from '../layout/Spinner';

import { Link } from 'react-router-dom';

const Game = () => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    height,
    width,
    end,
    rawTimings,
    numErrors,

    initGame,
    startGame
  } = gameContext;

  const resultContext = useContext(ResultContext);
  const { results, addResult, loading, getResults } = resultContext;

  const authContext = useContext(AuthContext);
  const { stopLoading, loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
      getResults();
    }
    if (end && rawTimings.length === nodes.length) {
      addResult(rawTimings, numErrors, isAuthenticated);
    }
    stopLoading();
    initGame();
    // eslint-disable-next-line
  }, [end]);

  const gamebox = (
    <div className="img-overlay-wrap">
      <img src={background} alt="empty" width={width} height={height} />
      <svg viewBox={`0 0 ${width} ${height}`}>
        {nodes.map((node, i) => (
          <Button key={i} i={i}></Button>
        ))}
      </svg>
    </div>
  );

  const endscreen = (
    // show results if any:
    // guest users will have their recent game,
    // logged in users will have normal message,
    // registered in users will be prompted to log in
    // show appropriate message for all
    <Fragment>
      <div
        className="jumbotron text-center jumbotron-fluid"
        style={{ backgroundColor: '#f0f8ff' }}
      >
        <div className="container">
          <h1>Trail Making Test</h1>
          <h6 style={{ color: '#777' }}>Your Result</h6>
        </div>
      </div>
      <div className="row">
        <div
          className="col-sm-4 text-center"
          style={{
            backgroundColor: '#fff',
            paddingTop: '16px',
            paddingBottom: '32px'
          }}
        >
          <strong>
            Average Completion Time :<br></br>29s (29000ms)
          </strong>
        </div>
        <div
          className="col-sm-4 text-center"
          style={{
            backgroundColor: '#fff',
            paddingTop: '16px',
            paddingBottom: '32px'
          }}
        >
          <strong>
            Deficiency is suspected :<br></br>>78s (78000ms)
          </strong>
        </div>
        <div
          className="col-sm-4 text-center"
          style={{
            backgroundColor: '#fff',
            paddingTop: '16px',
            paddingBottom: '32px'
          }}
        >
          <strong>
            Most common completion timing :<br></br>90s (90000ms)
          </strong>
        </div>
      </div>
      {/* impossible it happens but required to stop code from breaking */}
      {results !== null && !loading ? (
        <Fragment>
          {results.length > 0 ? (
            <ResultItem
              result={results[results.length - 1]}
              showDelete={false}
            ></ResultItem>
          ) : null}
        </Fragment>
      ) : (
        <Spinner />
      )}
      <div
        className="container text-center"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <button type="button" className="btn btn-success" onClick={startGame}>
          Try Again
        </button>
      </div>
      {isAuthenticated ? (
        <Fragment>
          <div
            className="container text-center"
            style={{
              backgroundColor: '#c6f7cf',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}
          >
            <p>Try again or view your other results in home page</p>
            <Link to="/">
              <button type="button" className="btn btn-success">
                View All Results
              </button>
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div
            className="container text-center"
            style={{
              backgroundColor: '#c6f7cf',
              paddingTop: '32px',
              paddingBottom: '32px'
            }}
          >
            <h4>You do not have an account.</h4>
            <p>Please log in or create an account to save your results!</p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <div>
      {!end ? (
        <Fragment>
          <GameNav></GameNav>
          {gamebox}
        </Fragment>
      ) : (
        <Fragment>{endscreen}</Fragment>
      )}
    </div>
  );
};

export default Game;
