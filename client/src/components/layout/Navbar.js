import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ResultsContext from '../../context/results/resultsContext';
import GameContext from '../../context/game/gameContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loading } = authContext;

  const resultsContext = useContext(ResultsContext);
  const { clearResults } = resultsContext;

  const gameContext = useContext(GameContext);
  const { startGame } = gameContext;

  const onLogout = () => {
    logout();
    clearResults();
    startGame();
  };

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item nav-link">Logged in as {user && user.name}!</li>
      <li className="nav-item">
        <a className="nav-link" onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="/">
          <i className={icon}></i> {title}{' '}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          {!loading ? (
            <ul className="navbar-nav">
              {!isAuthenticated || (user && user.type === 'appUser') ? (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/game">
                      Game
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctors">
                      Find Doctors
                    </Link>
                  </li>
                </Fragment>
              ) : null}
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: ' TMT 25',
  icon: 'fas fa-dot-circle'
};

export default Navbar;
