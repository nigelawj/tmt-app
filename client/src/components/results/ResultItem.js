import React from 'react';
import PropTypes from 'prop-types';

const ResultItem = ({ result }) => {
  const { _id, name, numErrors, timings } = result;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} <span className={'badge badge-primary'}></span>
      </h3>
      <p>Timings (/ms): </p>
      {timings.map((timing, i) => (
        <h6>{timing}</h6>
      ))}
      <p>Number of errors: {numErrors}</p>
    </div>
  );
};

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
};

export default ResultItem;
