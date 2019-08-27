import React, { useReducer } from 'react';
import uuid from 'uuid';
import TmtContext from './tmtContext';
import TmtReducer from './tmtReducer';

import {
  ADD_RESULT,
  DELETE_RESULT,
  EXPORT_RESULT
} from '../types';

const TmtState = props => {
  const initialState = {
    results: [
      {
        id: 1,
        name: 'legin'
      },
      {
        id: 2,
        name: 'legin'
      }
    ]
	};
	
	const [state, dispatch] = useReducer(TmtReducer, initialState);

	// Add Result

	// Delete Result

	// Export Result 

	// Add Patient (For Doctors)

	return (
		<TmtContext.Provider value={{
			results: state.results
		}}>
			{ props.children }
		</TmtContext.Provider>
	)
};

export default TmtState;