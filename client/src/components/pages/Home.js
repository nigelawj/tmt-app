import React, { useContext, useEffect } from 'react';
import Results from '../results/Results';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <h1>Welcome back, {user && user.name}</h1>
        {/* miscellaneous stats... no. games played? details? */}
      </div>
      <div>
        <Results />
      </div>
    </div>
  );
};

export default Home;
