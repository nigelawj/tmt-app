import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const GameSurvey = () => {
  const [terms, setTerms] = useState({
    rest: false,
    drugsMemory: false,
    drugsMovement: false,
    truthful: false
  });

  const { rest, drugsMemory, drugsMovement, truthful } = terms;

  const onChange = e => {
    setTerms({
      ...terms,
      [e.target.name]: e.target.value === 'false' ? true : false
    });
  };

  return (
    <Fragment>
      <div
        className="jumbotron text-center jumbotron-fluid"
        style={{ backgroundColor: '#f0f8ff' }}
      >
        <div className="container">
          <h1>Pre-Game Survey</h1>
          <h6 style={{ color: '#777' }}>
            Please answer the following to the best of your abilities, to ensure
            results retain their accuracy.
            <br />
            <br />
            <strong>
              Should you answer no to any of the following, please take the test
              again at a later time!
            </strong>
          </h6>
        </div>
      </div>
      <form>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="rest"
              type="checkbox"
              value={rest}
              onChange={onChange}
            />
            I have had at least 7 hours of uninterrupted rest.
          </label>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="drugsMemory"
              type="checkbox"
              value={drugsMemory}
              onChange={onChange}
            />
            I am not taking any drugs that cause Memory Loss.
          </label>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="drugsMovement"
              type="checkbox"
              value={drugsMovement}
              onChange={onChange}
            />
            I am not taking any drugs that cause Impaired Movement.
          </label>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              name="truthful"
              type="checkbox"
              value={truthful}
              onChange={onChange}
            />
            I agree that the abovementioned questions have been answered
            truthfully, to the best of my abilities.
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your Email Address here"
          />
        </div>
        <Link to="/game">
          {truthful ? (
            <button type="button" className="btn btn-info">
              Continue
            </button>
          ) : null}
        </Link>
      </form>
    </Fragment>
  );
};

export default GameSurvey;
