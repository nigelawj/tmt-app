// Displays all doctors available in database
// Allows filtering

import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';
import DoctorItem from './DoctorItem';
import Spinner from '../layout/Spinner';

const Doctors = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user, loading, stopLoading } = authContext;

  const listContext = useContext(ListContext);
  const { doctorList, getAllDoctors } = listContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser(); // refreshes the user object as well
    }
    stopLoading();
    getAllDoctors();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {/* could not combine them together, will throw 'doctors not defined error' */}
      {doctorList !== null && !loading ? (
        <Fragment>
          {doctorList.length > 0 ? <h1>List of doctors available:</h1> : null}
          {doctorList.length > 0 ? (
            doctorList.map(doctor => (
              <DoctorItem
                key={doctor._id}
                doctor={doctor}
                shared={user ? user.doctors.includes(doctor._id) : null}
              ></DoctorItem>
            ))
          ) : (
            <Fragment>
              <h1>No Doctors available.</h1>
            </Fragment>
          )}
          {!user ? (
            <Fragment>
              <h1>Please register to share results with a doctor!</h1>
            </Fragment>
          ) : null}
        </Fragment>
      ) : (
        <Spinner></Spinner>
      )}
    </Fragment>
  );
};

export default Doctors;
