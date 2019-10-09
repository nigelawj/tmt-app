import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const GameSurvey = () => {
  return (
    <Fragment>
      <h1>Pre-Game Survey</h1>
      <Link to="/game">Continue</Link>
    </Fragment>
  );
};

export default GameSurvey;
