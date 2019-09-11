import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ResultsContext from '../../context/results/resultsContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const resultsContext = useContext(ResultsContext);
  const { clearResults } = resultsContext;

  const onLogout = () => {
    logout();
    clearResults();
  };

  const authLinks = (
    <Fragment>
      {/* must put user && user.type as user is only loaded later, so will have null crash */}
      {user && user.type === 'doctor' ? (
        <li>
          <Link to="/patients">View Patients</Link>
        </li>
      ) : (
        <Fragment></Fragment>
      )}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>Logged in as {user && user.name}!</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}> {title} </i>
      </h1>
      <ul>
        <Fragment>
          {!isAuthenticated || (user && user.type === 'appUser') ? (
            <li>
              <Link to="/game">Game</Link>
              <Link to="/doctors">Find Doctors</Link>
            </li>
          ) : null}
        </Fragment>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'TMT App 25',
  icon: 'fas fa-dot-circle'
};

export default Navbar;
