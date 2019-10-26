import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const About = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, stopLoading } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    stopLoading();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div
        className="w3-content"
        style={{ maxWidth: '1100px', backgroundColor: '#f0f8ff' }}
      >
        <div className="w3-row w3-padding-64">
          <div className="w3-col m6 w3-padding-large w3-hide-small">
            <img
              src="https://static.wixstatic.com/media/e15b9d_73468e305a724f3da438bc5485528e29~mv2.png/v1/fill/w_1920,h_1003,al_c,q_85/e15b9d_73468e305a724f3da438bc5485528e29~mv2.webp"
              className="w3-round w3-image w3-opacity-min"
              alt="Table Setting"
              width="600"
              height="750"
            ></img>
          </div>
          <div className="w3-col m6 w3-padding-large">
            <h5 className="w3-left">Be Careful</h5>
            <br></br>
            <h3 className="w3-left">
              Cognitive Dysfunction is a serious issue
            </h3>
            <br></br>
            <p>
              <br></br>
              <br></br>Loss of memory? Confusion or concentration issues? Or
              even feeling depression? Take a Trail Making Test now to evaluate
              your cognitive abilities.
            </p>
            <Link to="/game">
              <button type="button" className="btn btn-info">
                Test Me Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w3-container w3-content w3-center w3-padding-64"
        style={{ maxWidth: '800px' }}
      >
        <h2>Trail Making Test</h2>
        <p className="w3-opacity">
          <i>What is a TMT?</i>
        </p>
        <p className="w3-justify">
          The Trail Making Test is a neuropsychological test of visual attention
          and task switching. It consists of two parts in which the subject is
          instructed to connect a set of 25 dots as quickly as possible while
          still maintaining accuracy. It is sensitive to detecting cognitive
          impairment associated with dementia; for example, Alzheimer's disease.
        </p>
        <br></br>
        <br></br>
        <img
          src="https://static.wixstatic.com/media/e15b9d_787771d4f609455b89ff17c1ae511c74~mv2.png/v1/fill/w_563,h_369,al_c,q_80,usm_0.66_1.00_0.01/tmt.webp"
          alt=""
          width="300"
          height="200"
        ></img>
      </div>
      <div
        className="w3-container w3-content w3-center w3-padding-64"
        style={{ maxWidth: '1100px', backgroundColor: '#76eec6' }}
      >
        <h5>Easy Steps to Diagnose</h5>
        <h3>Cognitive Dysfunction</h3>
      </div>
      <div
        className="w3-col w3-container m6 l6 w3-padding-64 w3-center"
        style={{ backgroundColor: '#b0e2ff' }}
      >
        <h5>Step 1</h5>
        <p>Take the TMT25 Test</p>
        <br></br>
        <Link to="/game">
          <button type="button" className="btn btn-dark">
            Test Now
          </button>
        </Link>
      </div>
      <div
        className="w3-col w3-container m6 l6 w3-padding-64 w3-center"
        style={{ backgroundColor: '#FCE2DC' }}
      >
        <h5>Step 2</h5>
        <p>Consult a doctor</p>
        <br></br>
        <Link to="/doctors">
          <button type="button" className="btn btn-dark">
            Find Doctors
          </button>
        </Link>
      </div>
      <div
        className="w3-container w3-content w3-center w3-padding-32"
        style={{ backgroundColor: '#fff' }}
      >
        <br></br>
      </div>
      <div
        class="w3-container w3-content w3-center w3-black w3-padding-16"
        style={{ maxWidth: '1100px' }}
      >
        <br></br>
        <p>© 2019 TMT 25 by Group 3+</p>
      </div>
    </Fragment>
    /*  
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <h3>Column 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4">
          <h3>Column 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
        <div class="col-sm-4">
          <h3>Column 3</h3>        
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
        </div>
      </div>
    </div>
    */
  );
};

export default About;
