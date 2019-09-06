import React, { useReducer } from 'react';
import axios from 'axios';
import ResultsContext from './resultsContext';
import ResultsReducer from './resultsReducer';

import {
  ADD_RESULT,
  DELETE_RESULT,
  EXPORT_RESULT,
  ADD_PATIENT,
  RESULT_ERROR
} from '../types';

const ResultsState = props => {
  const initialState = {
    results: [],
    error: null
  };

  const [state, dispatch] = useReducer(ResultsReducer, initialState);

  // Add Result
  const addResult = async (rawTimings, numErrors, isAuthenticated) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let timings = ['List of timings from node i-1 to i in ms'];
    for (let i = 1; i < rawTimings.length; i++) {
      timings[i] = rawTimings[i] - rawTimings[i - 1];
    }

    try {
      if (isAuthenticated) {
        const res = await axios.post(
          '/api/results',
          { timings, numErrors },
          config
        );
        dispatch({ type: ADD_RESULT, payload: res.data });
      } else {
        dispatch({ type: ADD_RESULT, payload: { timings, numErrors } });
      }
    } catch (err) {
      dispatch({ type: RESULT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Result

  // Export Result

  // Add Patient (For Doctors)

  // Result Error

  return (
    <ResultsContext.Provider
      value={{
        results: state.results,
        error: state.error,

        addResult
      }}
    >
      {props.children}
    </ResultsContext.Provider>
  );
};

export default ResultsState;
