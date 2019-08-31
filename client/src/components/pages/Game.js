import React, { useContext, useEffect } from 'react';
import background from '../game/background.png';

import GameNav from '../../components/layout/GameNav';
import Button from '../game/Button';

import './Game.css';
import { ResizableBox } from 'react-resizable';

import GameContext from '../../context/game/gameContext';

const Game = () => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    height,
    width,

    initGame
  } = gameContext;

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
    initGame();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={mapStyles}>
      <GameNav></GameNav>
      <ResizableBox className="box" width={width} height={height} axis='none'>
        <img src={background} alt="empty" width={width} height={height}/>
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
      </ResizableBox>
    </div>
  );
};

export default Game;
