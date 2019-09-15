import { GET_ALL_DOCTORS, GET_ASSIGNED_USERS, VIEW_PATIENT } from '../types';

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
    case VIEW_PATIENT:
      return {
        ...state,
        patientViewed: action.payload
      }
    default:
      return state;
  }
};
