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
  const { results, addResult } = resultContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

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
    if (end && rawTimings.length === nodes.length) {
      addResult(rawTimings, numErrors, isAuthenticated);
    }
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
    <Fragment>
      <h1>END GAME</h1>
      <strong>Your result: </strong>
      {/* impossible it happens but required to stop code from breaking */}
      {results.length > 0 ? (
        <ResultItem result={results[results.length - 1]}></ResultItem>
      ) : null}
      {isAuthenticated ? (
        <Fragment>
          <p>Try again or view your other results in home page</p>
          <button onClick={startGame}>Try again</button>
          {/* TO-DO: Link it to the results homepage */}
          <button>View All Results</button>
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
      <ResizableBox className="box" width={width} height={height} axis="none">
        {!end ? gamebox : endscreen}
      </ResizableBox>
    </div>
  );
};

export default Game;
