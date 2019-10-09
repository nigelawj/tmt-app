import React, { useReducer } from 'react';
import GameContext from './gameContext';
import GameReducer from './gameReducer';

import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS, INC_ERRORS, CHECKPOINT, END_GAME, START_GAME } from '../types';

const GameState = props => {
  const initialState = {
    nodes: [],
    links: [],
    prevNodes: [],

    playerPos: 0,
    numErrors: 0,
    rawTimings: [],
    end: false,

    width: 1036,
    height: 553,
    numPoints: 25,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // Initialise game
  const initGame = () => {
    dispatch({ type: INIT_GAME });
  };

  // Move playerpos
  const movePos = () => {
    dispatch({ type: MOVE_POS });
  };

  // Set Done - sets button's state to done
  const setDone = i => {
    dispatch({ type: SET_DONE, i: i });
  };

  // Reset Done - clear's the game data
  const resetDone = () => {
    dispatch({ type: RESET_DONE });
  };

  // Inc Errors - Increments numErrors
  const incErrors = () => {
    dispatch({ type: INC_ERRORS });
  }

  // Checkpoint
  const checkpoint = (i) => {
    dispatch({ type: CHECKPOINT, i: i });
  }

  // End game - set boolean to indicate game end - TRUE
  const endGame = () => {
    dispatch({ type: END_GAME });
  }

  // Start game - set boolean to indicate game start - FALSE
  const startGame = () => {
    dispatch({ type: START_GAME });
  }

  return (
    <GameContext.Provider
      value={{
        nodes: state.nodes,
        links: state.links,
        prevNodes: state.prevNodes,
        playerPos: state.playerPos,
        numErrors: state.numErrors,

        height: state.height,
        width: state.width,
        numPoints: state.numPoints,
        rawTimings: state.rawTimings,
        end: state.end,

        initGame,
        setDone,
        resetDone,
        movePos,
        incErrors,
        checkpoint,
        endGame,
        startGame
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
