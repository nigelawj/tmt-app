import React from 'react';

const Timer = () => {
	let time = new Date().toLocaleString;
	return (
		<div className='timer'>
			The time is {time}.
		</div>
	)
}

export default Timer;
