import {
  GET_RESULTS,
  ADD_RESULT,
  DELETE_RESULT,
  // EXPORT_RESULT,
  CLEAR_RESULTS,
  RESULT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false
      };
    case ADD_RESULT:
      if (action.local) {
        return {
          ...state,
          results: [action.payload],
          loading: false
        };
      } else {
        return {
          ...state,
          results: [...state.results, action.payload],
          loading: false
        };
      }
    case DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter(result => result._id !== action.payload),
        loading: false
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: null,
        error: null
      };
    case RESULT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
