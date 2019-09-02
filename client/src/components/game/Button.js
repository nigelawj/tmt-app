import React, { Fragment, useContext, useEffect } from 'react';

import GameContext from '../../context/game/gameContext';

const Button = ({ i }) => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    prevNodes,
    playerPos,
    NUM_POINTS,

    initGame,
    setDone,
    resetDone,
    movePos
  } = gameContext;

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const check = () => {
    if (i !== playerPos) {
      alert('failed. wrong one.');
      // TO-DO: Change to increment numErrors
      resetDone();
    } else if (playerPos === NUM_POINTS - 1) {
      //reached end + final choice is correct
      alert('Game completed!');
      // TO-DO: Get completion timings
      initGame();
    } else {
      //continue game
      setDone(i);
      movePos();
    }
  };

  return (
    <Fragment>
      <Fragment>
        <circle
          className={i}
          key={i}
          cx={nodes[i].x}
          cy={nodes[i].y}
          r="15"
          fill={nodes[i].done === true ? 'cyan' : 'grey'}
          onClick={check}
        />
        <text x={nodes[i].x} y={(nodes[i].y) + 0.2} textAnchor="middle" onClick={check}>
          {i+1}
        </text>
      </Fragment>
      <Fragment>
        <line
          key={i}
          x1={prevNodes[i].x}
          y1={prevNodes[i].y}
          x2={nodes[i].x}
          y2={nodes[i].y}
          strokeWidth={(i>0 && nodes[i].done) === true ? 5 : 0}
          stroke={'cyan'}
        />
      </Fragment>
    </Fragment>
  );
};

export default Button;

// import React, { Component, Fragment } from 'react';

// class Button extends Component {
//   state = {
//     x: 0,
//     y: 0,
//     done: false
//   };

//   componentDidMount = () => {
//     const { i, nodes } = this.props;
//     this.setState({ x: nodes[i].x });
//     this.setState({ y: nodes[i].y });
//   };

//   render() {
//     const  = this.props;
//     const { done } = this.state;

//     return (

//     );
//   }
// }

// export default Button;
