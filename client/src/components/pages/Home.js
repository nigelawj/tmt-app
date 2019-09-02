import React, { useContext, useEffect } from 'react';
import Results from '../results/Results';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>{/*Details of User perhaps? KIV*/}</div>
      <div>
        <Results />
      </div>
    </div>
  );
};

export default Home;
