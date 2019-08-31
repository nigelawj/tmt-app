import { INIT_GAME, SET_DONE, RESET_DONE, MOVE_POS } from '../types';

export default (state, action) => {
  let { width, height, nodes, prevNodes, links, playerPos, NUM_POINTS } = state;

  switch (action.type) {
    case INIT_GAME:
      const randomPoint = (width, height) => {
        let x = Math.floor(Math.random() * (95 - 5 + 1) + 5);
        let y = Math.floor(Math.random() * (95 - 5 + 1) + 5);
        //let done = (Math.random() < 0.5); // boolean
        return {
          x: x,
          y: y,
          done: false
        };
      };

      for (let i = 0; i < NUM_POINTS; i++) {
        nodes[i] = randomPoint(width, height);
        if (i > 0) {
          prevNodes[i - 1] = nodes[i];
        }
      }
      prevNodes.push(nodes[0]);

      console.log(nodes);
      console.log(prevNodes);

      for (let i = 0; i < NUM_POINTS - 1; i++) {
        links[i] = {
          s: i,
          d: i + 1
        };
      }
			console.log(links);
			
			return {
				...state,
				nodes: nodes,
				prevNodes: prevNodes,
				links: links
			};
    case SET_DONE:
      alert('Clicked!');

      nodes[action.i].done = true;

      return {
        ...state,
        nodes: nodes
      };

    case RESET_DONE:
      for (let i = 0; i < 5; i++) {
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
