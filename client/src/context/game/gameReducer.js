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
      var i = 0;
      const radius = 40;
      while (i < numPoints) {
        var overlapped = 0;
        nodes[i] = randomPoint(width, height);
        if (i > 0) {
          prevNodes[i] = nodes[i - 1];
        }
        for (let j = 0; j < i; j++) {
          if (
            (nodes[j].x - nodes[i].x) * (nodes[j].x - nodes[i].x) + (nodes[j].y - nodes[i].y) * (nodes[j].y - nodes[i].y) < (radius)**2
          ) {
            overlapped = 1;
          }
        }
        if (overlapped === 0) {
          i++;
        }
      }

      /*for (let i = 0; i < numPoints; i++) {
        nodes[i] = randomPoint(width, height);
        if (i > 0) {
          prevNodes[i] = nodes[i - 1];
        }
      }*/
      prevNodes[0] = nodes[numPoints - 1];

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
