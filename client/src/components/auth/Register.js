import React, { useState, useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated, stopLoading } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // redirects to '/'
    }

    if (
      error ===
      'User already exists!' /* must match text exactly (for now since small scale) */
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
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Type of Account</label>
          <select name="type" onChange={onChange}>
            <option value="appUser" defaultValue>
              User
            </option>
            <option value="doctor">Doctor</option>
          </select>
          <br></br>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder={type === 'doctor' ? 'e.g. Dr Dre' : "e.g. Lil' Wayne"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">NRIC No.</label>
          <input
            type="text"
            name="nric"
            value={nric}
            onChange={onChange}
            placeholder="e.g. S9533233F"
          />
        </div>
        {type === 'doctor' ? (
          <Fragment>
            <div className="form-group">
              <label htmlFor="name">Practicing Certificate Number</label>
              <input
                type="text"
                name="practicingCertNo"
                value={practicingCertNo}
                onChange={onChange}
                placeholder="e.g. ????"
              />
            </div>
          </Fragment>
        ) : null}
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
