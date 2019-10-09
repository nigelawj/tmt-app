import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

// NOTE: I WANT TO HAVE IT STYLED WITH RIGHT HAND SIDE LOGIN FORM
// THEN LEFT HAND SIDE CONTAINS INFORMATION ON THE SITE AND LINKS TO READ MORE
// ABOUT THE APP AND DEMENTIA ETC.
const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated, stopLoading } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // redirects to '/'
    }

    if (
      error ===
      'Invalid Credentials' /* must match text exactly (for now since app is small scale) */
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    stopLoading();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all the fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="container" style={{paddingTop:"64px",paddingBottom:"64px"}}>
      <div className="form-container">
        <div className="container text-center" style={{paddingTop:"0",paddingBottom:"16px"}}>
          <h3>
            <strong>Account <span className="text-info">Login</span></strong>
          </h3>
        </div>
        <form  className="form-horizontal" onSubmit={onSubmit}>
          <div className="form-group row">
            <div className="col-sm-2"></div>
            <label  className="col-form-label mr-2 col-sm-3 text-right" htmlFor="name">Email Address :</label>
            <div className="col-sm-5">
              <input className="form-control" type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="col-sm-2"></div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2"></div>
            <label className="col-form-label mr-2 col-sm-3 text-right " htmlFor="name">Password :</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="col-sm-6"></div>
          </div>
          <div className="container text-center">
            <input
              type="submit"
              value="Login"
              className="btn btn-info btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
