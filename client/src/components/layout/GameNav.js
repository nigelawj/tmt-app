import React, { useContext, Fragment } from 'react';
import './GameNavLayout.css';

import GameContext from '../../context/game/gameContext';
import Errors from '../game/Errors';

const GameNav = () => {
  const gameContext = useContext(GameContext);
  const { initGame, end } = gameContext;

  return (
    <Fragment>
      <div
        className="jumbotron text-center jumbotron-fluid"
        style={{ marginBottom: 0, backgroundColor: '#f0f8ff' }}
      >
        <div className="container">
          <h1>Trail Making Test</h1>
          <h6 style={{ color: '#777' }}>How to play?</h6>
          <p>
            Click on the circles in ascending order: 1, 2, 3, 4, and so on, as
            quickly as possible.
            <br></br>
            Clicking on a circle more than <strong>once </strong>
            counts towards an error.
            <br></br>
            Timing begins after you click on the first node!
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div
            className="col-sm-6 text-center"
            style={{ paddingTop: '32px', paddingBottom: '32px' }}
          >
            <Errors></Errors>
          </div>
          <div
            className="col-sm-6 text-center"
            style={{ paddingTop: '40px', paddingBottom: '32px' }}
          >
            {!end ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={initGame}
              >
                Restart
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GameNav;
