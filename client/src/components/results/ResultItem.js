import React from 'react'

const ResultItem = ({result}) => {
	const {id, name} = result;

	return (
		<div className='card bg-light'>
			<h3 className="text-primary text-left">
				{name}{' '} <span className={'badge badge-primary'}></span>
			</h3>
		</div>
	)
}

export default ResultItem;