import React, { Fragment, useContext, useEffect } from 'react';

import GameContext from '../../context/game/gameContext';

const Button = ({ i }) => {
  const gameContext = useContext(GameContext);
  const {
    nodes,
    prevNodes,
    playerPos,
    NUM_POINTS,
    xScale,
    yScale,

    initGame,
    setDone,
    resetDone,
    movePos
  } = gameContext;

  useEffect(() => {
    // setX(i);
    // setY(i);
    // eslint-disable-next-line
  }, []);

  const check = () => {
    if (i !== playerPos) {
      alert('failed. wrong one.');
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
          cx={xScale(nodes[i].x)}
          cy={yScale(nodes[i].y)}
          r="15"
          fill={nodes[i].done === true ? 'cyan' : 'grey'}
          onClick={check}
          //onMouseEnter={this.setDone}
        />
        <text x={xScale(nodes[i].x)} y={yScale((nodes[i].y) + 0.2)} textAnchor="middle">
          {i}
        </text>
      </Fragment>
      <Fragment>
        <line
          key={i}
          x1={xScale(prevNodes[i].x)}
          y1={yScale(prevNodes[i].y)}
          x2={xScale(nodes[i].x)}
          y2={yScale(nodes[i].y)}
          //strokeWidth={5}
          strokeWidth={nodes[i].done === true ? 5 : 0}
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
