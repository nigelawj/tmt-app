import React, { useState, useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    register,
    error,
    clearErrors,
    isAuthenticated,
    stopLoading
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // redirects to '/'
    }

    if (
      error ===
      'User already exists!' /* must match text exactly (for now since small scale)*/
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    stopLoading();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    type: 'appUser',
    name: '',
    email: '',
    nric: '',
    practicingCertNo: '',
    password: '',
    password2: ''
  });

  const {
    type,
    name,
    email,
    nric,
    practicingCertNo,
    password,
    password2
  } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      nric === '' ||
      (practicingCertNo === '' && type === 'doctor')
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        type,
        name,
        email,
        nric,
        practicingCertNo,
        password
      });
    }
  };

  return (
    <Fragment>
      <div
        className="jumbotron text-center jumbotron-fluid"
        style={{ marginBottom: 0, backgroundColor: '#edeefa' }}
      >
        <div className="container">
          <h1>Instant Registration</h1>
          <h6 style={{ color: '#777' }}>Register with Us!</h6>
          <p>
            Registered users have multiple privileges as compared to anonymous
            users.<br></br> You will be able to view your history results, and
            share your reports with doctor with ease.
          </p>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingTop: '32px', paddingBottom: '32px' }}
      >
        <div className="form-container">
          <div
            className="container text-center"
            style={{ paddingTop: '32px', paddingBottom: '16px' }}
          >
            <h3>
              <strong>
                Account <span className="text-info">Registration</span>
              </strong>
            </h3>
          </div>
          <form className="form-horizontal" onSubmit={onSubmit}>
            <div className="form-group row">
              <div className="col-sm-1"></div>
              <label
                className="col-form-label mr-2 col-sm-2 text-right "
                htmlFor="name"
              >
                Type of Account :
              </label>
              <div className="col-sm-8">
                <select
                  className="form-control custom-select"
                  name="type"
                  onChange={onChange}
                >
                  <option value="appUser" defaultValue>
                    User
                  </option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <div className="col-sm-1"></div>
            </div>
            <div className="form-group row">
              <div className="col-sm-1"></div>
              <label
                className="col-form-label mr-2 col-sm-2 text-right"
                htmlFor="name"
              >
                Name :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={onChange}
                  placeholder={
                    type === 'doctor' ? 'e.g. Dr Dre' : "e.g. Lil' Wayne"
                  }
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
            <div className="form-group row">
              <div className="col-sm-1"></div>
              <label
                className="col-form-label mr-2 col-sm-2 text-right"
                htmlFor="name"
              >
                Email Address :
              </label>
              <div class="col-sm-8">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="e.g. weimin@gmail.com"
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
            <div className="form-group row">
              <div className="col-sm-1"></div>
              <label
                className="col-form-label mr-2 col-sm-2 text-right"
                htmlFor="name"
              >
                NRIC No. :
              </label>
              <div class="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  name="nric"
                  value={nric}
                  onChange={onChange}
                  placeholder="e.g. S9533233F"
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
            {type === 'doctor' ? (
              <Fragment>
                <div className="form-group row">
                  <label
                    className="col-form-label mr-2 col-sm-3 text-right"
                    htmlFor="name"
                  >
                    Practicing Certificate Number :
                  </label>
                  <div class="col-sm-8">
                    <input
                      className="form-control"
                      type="text"
                      name="practicingCertNo"
                      value={practicingCertNo}
                      onChange={onChange}
                      placeholder=""
                    />
                  </div>
                  <div className="col-sm-1"></div>
                </div>
              </Fragment>
            ) : null}
            <div className="form-group row">
              <div className="col-sm-1"></div>
              <label
                className="col-form-label mr-2 col-sm-2 text-right"
                htmlFor="name"
              >
                Password :
              </label>
              <div class="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLength="6"
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
            <div className="form-group row">
              <label
                className="col-form-label mr-2 col-sm-3 text-right"
                htmlFor="name"
              >
                Confirm Password :
              </label>
              <div class="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <div className="col-sm-1"></div>
            </div>
            <input
              type="submit"
              value="Register"
              className="btn btn-info btn-block"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
