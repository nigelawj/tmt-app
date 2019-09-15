import React, { useContext, useEffect, Fragment } from 'react';
import background from '../game/background.png';

import GameNav from '../../components/layout/GameNav';
import Button from '../game/Button';

import './Game.css';
import { ResizableBox } from 'react-resizable';

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

  const mapStyles = {
    position: 'relative'
  };
  const svgStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

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
    <Fragment>
      <img src={background} alt="empty" width={width} height={height} />
      <svg
        style={svgStyles}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {nodes.map((node, i) => (
          <Button key={i} i={i}></Button>
        ))}
      </svg>
    </Fragment>
  );

  const endscreen = (
    // show results if any:
    // guest users will have their recent game,
    // logged in users will have normal message,
    // registered in users will be prompted to log in
    // show appropriate message for all
    <Fragment>
      <h1>END GAME</h1>
      <strong>Your result: </strong>
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

      <button onClick={startGame}>Try again</button>
      {isAuthenticated ? (
        <Fragment>
          <p>Try again or view your other results in home page</p>
          {/* TO-DO: Test if this button works! ez test. pls remove after testing */}
          <Link to="/">
            <button>View All Results</button>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <h1>
            You do not have an account. Please log in or create an account to be
            able to save results/view past results!
          </h1>
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <div style={mapStyles}>
      <GameNav></GameNav>
      {!end ? (
        <ResizableBox className="box" width={width} height={height} axis="none">
          {gamebox}
        </ResizableBox>
      ) : (
        <Fragment>{endscreen}</Fragment>
      )}
    </div>
  );
};

export default Game;
