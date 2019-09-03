import {
  ADD_RESULT,
  DELETE_RESULT,
  EXPORT_RESULT,
  ADD_PATIENT,
  RESULT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        results: [...state.results, action.payload]
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
