import React, { useContext } from 'react';
import Popup from 'reactjs-popup';

import GameContext from '../../context/game/gameContext';

const GameNav = () => {
  const gameContext = useContext(GameContext);
  const { initGame } = gameContext;

  return (
    <div className="navbar bg-primary">
      <ul>
        <li>
          <button onClick={initGame}>RESET</button>
        </li>
        <li>
          <Popup
            trigger={<button className='button'>Help</button>}
            position="right center"
            modal
            closeOnDocumentClick
          >
            <span>Popup content here !!</span>
          </Popup>
        </li>
      </ul>
    </div>
  );
};

export default GameNav;
