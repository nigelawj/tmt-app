import React, { useReducer } from 'react';
import axios from 'axios';
import ResultsContext from './resultsContext';
import ResultsReducer from './resultsReducer';

import {
  GET_RESULTS,
  ADD_RESULT,
  DELETE_RESULT,
  EXPORT_RESULT,
  CLEAR_RESULTS,
  RESULT_ERROR
} from '../types';

const ResultsState = props => {
  const initialState = {
    results: null,
    error: null
  };

  const [state, dispatch] = useReducer(ResultsReducer, initialState);

  // Get Results
  const getResults = async () => {
    try {
      const res = await axios.get('/api/results');
      dispatch({ type: GET_RESULTS, payload: res.data });
    } catch (err) {
      resultError(err);
    }
  };

  // Add Result
  const addResult = async (rawTimings, numErrors, isAuthenticated) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Create Timings Array
    let temp = null;
    let timings = [];
    for (let i = 1; i < rawTimings.length; i++) {
      temp = rawTimings[i] - rawTimings[i - 1];
      timings[i-1] = {
        x: i,
        y: temp
      }
    }

    try {
      if (isAuthenticated) {
        // if user is logged in, post results to database first
        const res = await axios.post(
          '/api/results',
          { timings, numErrors },
          config
        );
        dispatch({ type: ADD_RESULT, payload: res.data, local: false });
      } else {
        // user is not logged in, display temp copy of result
        dispatch({
          type: ADD_RESULT,
          payload: { timings, numErrors },
          local: true
        });
      }
    } catch (err) {
      resultError(err);
    }
  };

  // Delete Result
  const deleteResult = async id => {
    try {
      await axios.delete(`/api/results/${id}`);
      dispatch({ type: DELETE_RESULT, payload: id });
    } catch (err) {
      resultError(err);
    }
  };

  // Export Result

  // Clear Results Upon Logout
  const clearResults = () => {
    dispatch({ type: CLEAR_RESULTS });
  };

  // Result Error
  const resultError = err => {
    dispatch({ type: RESULT_ERROR, payload: err.response.msg });
  };

  return (
    <ResultsContext.Provider
      value={{
        results: state.results,
        error: state.error,

        getResults,
        addResult,
        deleteResult,
        clearResults
      }}
    >
      {props.children}
    </ResultsContext.Provider>
  );
};

export default ResultsState;
