import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ResultsContext from '../../context/results/resultsContext';

import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

const ResultItem = ({ result, showDelete }) => {
  const resultContext = useContext(ResultsContext);
  const { deleteResult } = resultContext;

  const { _id, name, numErrors, timings } = result;

  const onDelete = () => {
    deleteResult(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name ? name : 'Guest'}{' '}
        <span style={{ float: 'right' }} className={'badge badge-primary'}>
          User
        </span>
      </h3>
      <h3>
        {/* Timings (/ms):
        {timings.map((timing, i) => (
          <h6>{timing}</h6>
        ))} */}
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            data={result.timings}
          ></VictoryLine>
        </VictoryChart>
      </h3>
      <p>
        Number of errors: {numErrors}
        {showDelete ? (
          <button
            style={{ float: 'right' }}
            className="btn btn-danger btn-sm"
            onClick={onDelete}
          >
            Delete Result
          </button>
        ) : null}
      </p>
    </div>
  );
};

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
};

export default ResultItem;
