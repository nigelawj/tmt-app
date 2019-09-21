import {
  INIT_GAME,
  SET_DONE,
  RESET_DONE,
  MOVE_POS,
  INC_ERRORS,
  CHECKPOINT,
  END_GAME,
  START_GAME
} from '../types';
import randomPoint from '../../utils/randomPoint';

export default (state, action) => {
  let {
    //nodeList,

    width,
    height,
    nodes,
    prevNodes,
    playerPos,
    numPoints,
    numErrors,
    rawTimings,
    end
  } = state;

  switch (action.type) {
    case INIT_GAME:
      // const initLists = () => {
      //   // Initialise all possible points.
      //   // Points are ensured to not overlap
      //   let i=0;
      //   for (let x=30; x<width; x+=29) {
      //     for (let y=30; y<height; y+=31) {
      //       nodeList[i] = {
      //         x: x,
      //         y: y,
      //         done: false
      //       };
      //       i++;
      //     }
      //   }
      // }

      // const choosePoints = () => {
      //   // Initialise indexes of points chosen
      //   let j = [];
      //   for (let i=0; i<numPoints; i++) {
      //     console.log(Math.floor(Math.random() * (nodeList.length - 0 + 1)));
      //     j[i] = Math.floor(Math.random() * (nodeList.length - 0 + 1));
      //   }

      //   // Initialise nodes and prevNodes arrays
      //   for (let i=0; i<j.length; i++) {
      //     nodes[i] = nodeList[j[i]];
      //     if (i > 0) {
      //       prevNodes[i] = nodes[i-1];
      //     }
      //   }
      //   prevNodes[0] = nodes[numPoints - 1];
      // }

      for (let i = 0; i < numPoints; i++) {
        nodes[i] = randomPoint(width, height);
        if (i > 0) {
          prevNodes[i] = nodes[i - 1];
        }
      }
      prevNodes[0] = nodes[numPoints - 1];

      // initLists();
      // choosePoints();

      console.log(nodes);
      console.log(prevNodes);

      return {
        ...state,
        nodes: nodes,
        prevNodes: prevNodes,
        playerPos: 0,
        numErrors: 0,
        rawTimings: []
      };
    case SET_DONE:
      nodes[action.i].done = true;

      return {
        ...state,
        nodes: nodes
      };
    case RESET_DONE:
      for (let i = 0; i < numPoints; i++) {
        nodes[i].done = false;
      }

      return {
        ...state,
        nodes: nodes,
        playerPos: 0,
        numErrors: 0
      };
    case MOVE_POS:
      playerPos++;
      return {
        ...state,
        playerPos: playerPos
      };
    case INC_ERRORS:
      numErrors++;
      return {
        ...state,
        numErrors: numErrors
      };
    case CHECKPOINT:
      rawTimings[action.i] = Date.now();
      return {
        ...state,
        rawTimings: rawTimings
      };
    case END_GAME:
      end = true;
      return {
        ...state,
        end: end
      };
    case START_GAME:
      end = false;
      return {
        ...state,
        end: end
      };
    default:
      return state;
  }
};
