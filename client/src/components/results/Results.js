import React, { Fragment, useContext, useEffect } from 'react';

import ResultItem from './ResultItem';
import ResultsContext from '../../context/results/resultsContext';
import Spinner from '../layout/Spinner';

const Results = () => {
  const resultsContext = useContext(ResultsContext);
  const { results, getResults, loading } = resultsContext;

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {results !== null && !loading ? (
        <Fragment>
          {results.length > 0 ? (
            results.map(result => (
              <ResultItem
                key={result._id}
                result={result}
                showDelete={true}
              ></ResultItem>
            ))
          ) : (
            <Fragment>
              <h1>No Results. Play a game?</h1>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Results;
