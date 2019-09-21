import React, { useContext, useEffect, Fragment } from 'react';
import Results from '../results/Results';
import Patients from '../list/Patients';
import AuthContext from '../../context/auth/authContext';

// GUESTS SHOULD NOT BE ABLE TO SEE THIS;
// THE GUESTS WILL BE REDIRECTED VIA PRIVATEROUTE.JS
const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, stopLoading } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    stopLoading();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {user && <h1>Welcome back, {user.name}</h1>}
      <div>
        {user && user.type === 'appUser' ? (
          <Results />
        ) : (
          <Fragment>
            <h1>List of patients under you:</h1>
            <Patients></Patients>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
