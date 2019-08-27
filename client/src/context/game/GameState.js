import React, { useReducer } from 'react';
import GameContext from './gameContext';
import GameReducer from './gameReducer';

import { scaleLinear } from 'd3-scale';

import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS } from '../types';

const GameState = props => {
  const initialState = {
    nodes: [],
    links: [],
    prevNodes: [],
    playerPos: 0,

    width: 970,
    height: 2030,
    NUM_POINTS: 5,
    mapStyles: {
      position: 'relative'
    },
    svgStyles: {
      position: 'absolute',
      top: 35,
      left: 20,
      right: 0,
      bottom: 0
    },
    xScale: scaleLinear()
      .domain([0, 100])
      .range([0, 970]),
    yScale: scaleLinear()
      .domain([0, 100])
      .range([0, 2030])
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // Initialise game
  const initGame = () => {
    dispatch({ type: INIT_GAME });
    resetDone();
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
        nodes: state.nodes,
        links: state.links,
        prevNodes: state.prevNodes,
        playerPos: state.playerPos,

        height: state.height,
        width: state.width,
        NUM_POINTS: state.NUM_POINTS,
        mapStyles: state.mapStyles,
        svgStyles: state.svgStyles,
        xScale: state.xScale,
        yScale: state.yScale,

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
