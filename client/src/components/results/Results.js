import React, { Fragment, useContext } from 'react';
import ResultsContext from '../../context/results/resultsContext';
import ResultItem from './ResultItem';

const Results = () => {
  const resultsContext = useContext(ResultsContext);
  const { results } = resultsContext;

  return (
    <Fragment>
      {results.map(result => (
        <ResultItem key={result.id} result={result}></ResultItem>
      ))}
    </Fragment>
  );
};

export default Results;
