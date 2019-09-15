import React, { useReducer } from 'react';
import ListContext from './listContext';
import ListReducer from './listReducer';

import axios from 'axios';

import { GET_ALL_DOCTORS, GET_ASSIGNED_USERS, VIEW_PATIENT } from '../types';

const ListState = props => {
  const initialState = {
    doctorList: null,
    assignedUsersList: null,
    patientViewed: null
  };

  const [state, dispatch] = useReducer(ListReducer, initialState);

  // Share (result) with Doctor
  const shareWithDoctor = async doctorID => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `api/list/share/${doctorID}`,
      { doctorID: doctorID },
      config
    );
    return res.data;
  };

  // Get List of Doctors
  const getAllDoctors = async () => {
    const res = await axios.get('api/list/doctors');
    dispatch({ type: GET_ALL_DOCTORS, payload: res.data });
  };

  // Get Users assigned to Doctor
  const getAssignedUsers = async () => {
    const res = await axios.get('api/list/patients');
    dispatch({ type: GET_ASSIGNED_USERS, payload: res.data });
  };

  // View Patient
  const viewPatient = async _id => {
    let res = await axios.get(`api/list/${_id}`);
    let res2 = await axios.get(`api/results/${_id}`);
    let results = [];

    for (let i=0; i<res2.data.length; i++) {
      results[i] = res2.data[i].timings;
    }
    res.data.results = results;
    // TO-DO: convert results from obj of arrays to an array of arrays
    dispatch({ type: VIEW_PATIENT, payload: res.data });
  };

  return (
    <ListContext.Provider
      value={{
        doctorList: state.doctorList,
        assignedUsersList: state.assignedUsersList,
        patientViewed: state.patientViewed,

        shareWithDoctor,
        getAllDoctors,
        getAssignedUsers,
        viewPatient
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
