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
  const addResult = async result => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/results', result, config);
      dispatch({ type: ADD_RESULT, payload: res.data });
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
        error: state.error
      }}
    >
      {props.children}
    </ResultsContext.Provider>
  );
};

export default ResultsState;
