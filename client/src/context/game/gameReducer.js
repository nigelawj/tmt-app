import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS } from '../types';

export default (state, action) => {
  let { width, height, nodeList, nodes, prevNodes, playerPos, NUM_POINTS } = state;

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
      //   for (let i=0; i<NUM_POINTS; i++) {
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
      //   prevNodes[0] = nodes[NUM_POINTS - 1];
      // }

      const randomPoint = () => {
        let x = Math.floor(Math.random() * (width - 100 + 1) + 50);
        let y = Math.floor(Math.random() * (height - 100 + 1) + 50);
        //let done = (Math.random() < 0.5); // boolean

        return {
          x: x,
          y: y,
          done: false
        };
      };

      for (let i = 0; i < NUM_POINTS; i++) {
        nodes[i] = randomPoint();
        if (i > 0) {
          prevNodes[i] = nodes[i-1];
        }
			}
      prevNodes[0] = nodes[NUM_POINTS - 1];
      
      // initLists();
      // choosePoints();

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
