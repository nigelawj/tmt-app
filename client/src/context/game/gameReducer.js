import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS } from '../types';

export default (state, action) => {
  let { width, height, nodes, prevNodes, playerPos, NUM_POINTS } = state;

  switch (action.type) {
    case INIT_GAME:
      const randomPoint = () => {
        let x = Math.floor(Math.random() * (width - 0 + 1) + 5);
        let y = Math.floor(Math.random() * (height - 0 + 1) + 5);
        //let done = (Math.random() < 0.5); // boolean

        // if (nodes === []) {
        //   return {
        //     x: x,
        //     y: y,
        //     done: false
        //   };
        // }

        // // Check through all points already created, to ensure no two points overlap
        // for (let i = 0; i<nodes.length; i++){
        //   if (Math.abs(x - nodes[i].x) < 20 || Math.abs(y - nodes[i].y) < 20) {
        //     return null;
        //   }
        // }

        return {
          x: x,
          y: y,
          done: false
        };
      };

      for (let i = 0; i < NUM_POINTS; i++) {
        // let temp = null;
        // while (temp === null){
        //   temp = randomPoint();
        // }
        // nodes[i] = temp;
        nodes[i] = randomPoint();
        if (i > 0) {
          prevNodes[i] = nodes[i-1];
        }
			}
			prevNodes[0] = nodes[NUM_POINTS - 1];

      console.log(nodes);
      console.log(prevNodes);
			
			return {
				...state,
				nodes: nodes,
				prevNodes: prevNodes,
			};
    case SET_DONE:
      nodes[action.i].done = true;

      return {
        ...state,
        nodes: nodes
      };

    case RESET_DONE:
      for (let i = 0; i < NUM_POINTS; i++) {
        nodes[i].done = false;
      }

      return {
        ...state,
        nodes: nodes,
        playerPos: 0
      };

    case MOVE_POS:
      playerPos++;
      return {
        ...state,
        playerPos: playerPos
      };
    default:
      return state;
  }
};
