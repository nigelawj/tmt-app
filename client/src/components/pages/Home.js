import React, { useContext, useEffect, Fragment } from 'react';
import Results from '../results/Results';
import Patients from '../list/Patients';
import AuthContext from '../../context/auth/authContext';

// GUESTS SHOULD NOT BE ABLE TO SEE THIS;
// THE GUESTS WILL BE REDIRECTED VIA PRIVATEROUTE.JS
const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        {user && <h1>Welcome back, {user.name}</h1>}
        {/* miscellaneous stats... no. games played? details? */}
      </div>
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
