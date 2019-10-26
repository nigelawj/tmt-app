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
      <div className="container" style={{paddingTop:"32px",paddingBottom:"32px"}}>
        {user && <h1>Welcome back, {user.name}</h1>}
      </div>
      <div className="container" style={{paddingBottom:"64px"}}>
        {user && user.type === 'appUser' ? (
          <Results />
        ) : (
          <Fragment>
            <div className="jumbotron text-center jumbotron-fluid" style={{backgroundColor:"#ace1af"}}>
              <div className="container">
                <h1>View Patients</h1>
                <h6 style={{color:"#777"}}>View patients' details here</h6>   
                <br></br>
                <p>Monitor your patients' data!</p> 
              </div>
            </div>
            <div className="container text-center" style={{paddingTop:"16px", paddingBottom:"32px"}}>
              <h5>Patients: </h5>
              <Patients></Patients>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
