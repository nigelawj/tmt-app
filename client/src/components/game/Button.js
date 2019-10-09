import React, { Fragment, useContext, useEffect } from 'react';

import GameContext from '../../context/game/gameContext';

const Button = ({ i }) => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    prevNodes,
    playerPos,
    numPoints,

    setDone,
    movePos,
    incErrors,
    checkpoint,
    endGame
  } = gameContext;

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  // check(): function to implement logic triggered upon button click
  const check = () => {
    if (i !== playerPos) {
      // Wrong choice - error
      incErrors();
    }
    else if (playerPos === numPoints - 1) {
      // Reached end + final choice is correct
      checkpoint(i);
      endGame();
    } else {
      // Correct choice - setDone, movePos, and checkpoint
      checkpoint(i);
      setDone(i);
      movePos();
    }
  };

  return (
    <Fragment>
      <Fragment>
        <line
          key={i}
          x1={prevNodes[i].x}
          y1={prevNodes[i].y}
          x2={nodes[i].x}
          y2={nodes[i].y}
          strokeWidth={(i>0 && nodes[i].done) === true ? 3 : 0}
          stroke={'white'}
        />
      </Fragment>
      <Fragment>
        <circle
          className={i}
          key={i}
          cx={nodes[i].x}
          cy={nodes[i].y}
          r="15"
          fill={nodes[i].done === true ? '#14b00c' : '#e0701b'}
          stroke="white"
          strokeWidth="2"
          onClick={check} 
        />
        <text x={nodes[i].x} y={(nodes[i].y) + 0.2} textAnchor="middle" onClick={check} fill="white">
          {i+1}
        </text>
      </Fragment>
    </Fragment>
  );
};

export default Button;

/*<Fragment>
        <line
          key={i}
          x1={prevNodes[i].x}
          y1={prevNodes[i].y}
          x2={nodes[i].x}
          y2={nodes[i].y}
          strokeWidth={(i>0 && nodes[i].done) === true ? 3 : 0}
          stroke={'white'}
        />
</Fragment>*/