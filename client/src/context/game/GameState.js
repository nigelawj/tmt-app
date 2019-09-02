import React, { useReducer } from 'react';
import GameContext from './gameContext';
import GameReducer from './gameReducer';

import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS } from '../types';

const GameState = props => {
  const initialState = {
    nodeList: [],
    nodes: [],
    links: [],
    prevNodes: [],
    playerPos: 0,

    width: 1036,
    height: 553,
    NUM_POINTS: 25,
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // Initialise game
  const initGame = () => {
    dispatch({ type: INIT_GAME });
    //resetDone();
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

  return (
    <GameContext.Provider
      value={{
        nodeList: state.nodeList,
        nodes: state.nodes,
        links: state.links,
        prevNodes: state.prevNodes,
        playerPos: state.playerPos,

        height: state.height,
        width: state.width,
        NUM_POINTS: state.NUM_POINTS,

        initGame,
        setDone,
        resetDone,
        movePos
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
