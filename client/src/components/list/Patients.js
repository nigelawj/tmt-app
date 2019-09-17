// Displays list of patients tagged to a certain doctor
// Allows filtering

import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

import Filter from './Filter';

const Patients = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, loading } = authContext;

  const listContext = useContext(ListContext);
  const { assignedUsersList, getAssignedUsers, filtered } = listContext;

  useEffect(() => {
    loadUser();
    getAssignedUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Filter filterType="assignedUsers"></Filter>
      {assignedUsersList !== null && !loading ? (
        <Fragment>
          {assignedUsersList.length > 0 ? (
            <Fragment>
              {filtered !== null
                ? filtered.map(assignedUser => (
                    <UserItem
                      key={assignedUser._id}
                      assignedUser={assignedUser}
                    ></UserItem>
                  ))
                : assignedUsersList.map(assignedUser => (
                    <UserItem
                      key={assignedUser._id}
                      assignedUser={assignedUser}
                    ></UserItem>
                  ))}
            </Fragment>
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
