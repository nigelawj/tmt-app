import { GET_ALL_DOCTORS, GET_ASSIGNED_USERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_DOCTORS:
      return {
        ...state,
        doctorList: action.payload
      };
    case GET_ASSIGNED_USERS:
      return {
        ...state,
        assignedUsersList: action.payload
      }
    default:
      return state;
  }
};
