import React, { Fragment, useContext } from 'react';
import TmtContext from '../../context/TMT/tmtContext';

const Results = () => {
	const tmtContext = useContext(TmtContext);
	const { results } = tmtContext;

  return (
		<Fragment>
			{results.map(result => (
				<h3>{result.name}</h3>
			))}
		</Fragment>
	);
};

export default Results;
