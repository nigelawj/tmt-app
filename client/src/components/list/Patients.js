// Displays list of patients tagged to a certain doctor
// Allows filtering

import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Patients = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, loading } = authContext;

  const listContext = useContext(ListContext);
  const { assignedUsersList, getAssignedUsers } = listContext;

  useEffect(() => {
    loadUser();
    getAssignedUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {assignedUsersList !== null && !loading ? (
        <Fragment>
          {assignedUsersList.length > 0 ? (
            assignedUsersList.map(assignedUser => (
              <UserItem
                key={assignedUser._id}
                assignedUser={assignedUser}
              ></UserItem>
            ))
          ) : (
            <Fragment>
              <h1>You currently have no patients.</h1>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Spinner></Spinner>
      )}
    </Fragment>
  );
};

export default Patients;
