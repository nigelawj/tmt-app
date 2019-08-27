import React, { useContext, useEffect } from 'react';
import background from '../game/background.png';

import GameNav from '../../components/layout/GameNav';
import Button from '../game/Button';

import GameContext from '../../context/game/gameContext';

const Game = () => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    height,
    width,
    mapStyles,
    svgStyles,

    initGame
  } = gameContext;

  useEffect(() => {
    initGame();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={mapStyles}>
      <GameNav></GameNav>
      <img src={background} alt="empty" />
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
    </div>
  );
};

export default Game;
