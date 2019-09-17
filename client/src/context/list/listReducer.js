import {
  GET_ALL_DOCTORS,
  GET_ASSIGNED_USERS,
  VIEW_PATIENT,
  FILTER_DOCTORS,
  FILTER_ASSIGNED_USERS,
  CLEAR_FILTER
} from '../types';

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
      };
    case VIEW_PATIENT:
      return {
        ...state,
        patientViewed: action.payload
      };
    case FILTER_DOCTORS:
      return {
        ...state,
        filtered: state.doctorList.filter(doctor => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return doctor.name.match(regex) || doctor.email.match(regex);
        })
      };
    case FILTER_ASSIGNED_USERS:
      return {
        ...state,
        filtered: state.assignedUsersList.filter(assignedUser => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return assignedUser.name.match(regex) || assignedUser.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
