import React, { useContext } from 'react';
import GameContext from '../../context/game/gameContext';

const Errors = () => {
	const gameContext = useContext(GameContext);
	const { numErrors } = gameContext;

	return (
		<div>
			Number of mistakes: <strong>{ numErrors }</strong>
		</div>
	)
}

export default Errors;
