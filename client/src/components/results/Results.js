import React, { Fragment, useContext } from 'react';

import ResultItem from './ResultItem';

import ResultsContext from '../../context/results/resultsContext';

const Results = () => {
  const resultsContext = useContext(ResultsContext);
  const { results } = resultsContext;

  return (
    <Fragment>
      {results.length > 0 ? (
        results.map(result => (
          <ResultItem key={result._id} result={result}></ResultItem>
        ))
      ) : (
        <Fragment>
          <h1>No Results. Play a game?</h1>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Results;
