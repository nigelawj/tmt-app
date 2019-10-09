// Displays all doctors available in database
// Allows filtering

import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';
import DoctorItem from './DoctorItem';
import Spinner from '../layout/Spinner';

import Filter from './Filter';

const Doctors = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user, loading, stopLoading } = authContext;

  const listContext = useContext(ListContext);
  const { doctorList, getAllDoctors, filtered } = listContext;

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
      <div
        className="jumbotron text-center jumbotron-fluid"
        style={{ marginBottom: 0, backgroundColor: '#f0f8ff' }}
      >
        <div className="container">
          <h1>Find Doctors</h1>
          <h6 style={{ color: '#777' }}>Wanted to Get Diagnosed?</h6>
          <p>
            TMT25 provides a list of registered doctors. Users should speak with
            a doctor regarding any concerns.
            <br></br>
            Registered users will be able to share the results with doctors of
            your choice.
            <br></br>
            <br></br>
            You are <strong>highly encouraged</strong> to contact the doctor to
            make an appointment before sharing confidential information.
          </p>
          <Filter filterType="doctors"></Filter>
        </div>
      </div>
      <div
        className="container text-center"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        {doctorList !== null && !loading ? (
          <Fragment>
            {doctorList.length > 0 ? <h5>Doctors: </h5> : null}
            {doctorList.length > 0 ? (
              <Fragment>
                {filtered !== null
                  ? filtered.map(doctor => (
                      <DoctorItem
                        key={doctor._id}
                        doctor={doctor}
                        shared={user ? user.doctors.includes(doctor._id) : null}
                      ></DoctorItem>
                    ))
                  : doctorList.map(doctor => (
                      <DoctorItem
                        key={doctor._id}
                        doctor={doctor}
                        shared={user ? user.doctors.includes(doctor._id) : null}
                      ></DoctorItem>
                    ))}
              </Fragment>
            ) : (
              <Fragment>
                <h1>No Doctors available.</h1>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
      {!user ? (
        <Fragment>
          <div
            className="container text-center"
            style={{
              backgroundColor: '#c6f7cf',
              paddingTop: '32px',
              paddingBottom: '32px'
            }}
          >
            <h4>You do not have an account.</h4>
            <p>Please register to share results with a doctor!</p>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Doctors;

/*<Filter filterType="doctors"></Filter>
      {doctorList !== null && !loading ? (
        <Fragment>
          {doctorList.length > 0 ? <h1>List of doctors available:</h1> : null}
          {doctorList.length > 0 ? (
            <Fragment>
              {filtered !== null
                ? filtered.map(doctor => (
                    <DoctorItem
                      key={doctor._id}
                      doctor={doctor}
                      shared={user ? user.doctors.includes(doctor._id) : null}
                    ></DoctorItem>
                  ))
                : doctorList.map(doctor => (
                    <DoctorItem
                      key={doctor._id}
                      doctor={doctor}
                      shared={user ? user.doctors.includes(doctor._id) : null}
                    ></DoctorItem>
                  ))}
            </Fragment>
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
    </Fragment>*/
