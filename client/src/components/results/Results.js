import React, { Fragment, useContext } from 'react';
import TmtContext from '../../context/TMT/tmtContext';
import ResultItem from './ResultItem';

const Results = () => {
  const tmtContext = useContext(TmtContext);
  const { results } = tmtContext;

  return (
    <Fragment>
      {results.map(result => (
        <ResultItem key={result.id} result={result}></ResultItem>
      ))}
    </Fragment>
  );
};

export default Results;
