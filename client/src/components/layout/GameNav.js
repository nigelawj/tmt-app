import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import './layout.css';

import GameContext from '../../context/game/gameContext';
import Errors from '../game/Errors';

const GameNav = () => {
  const gameContext = useContext(GameContext);
  const { initGame } = gameContext;

  return (
    <div className="navbar bg-primary">
      <ul>
        <li>
          <button onClick={initGame}>RESET</button>
        </li>
      </ul>
      <Popup trigger={<button>About</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
      <Errors></Errors>
    </div>
  );
};

export default GameNav;
