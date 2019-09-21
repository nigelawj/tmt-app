import React, { Fragment, useContext, useEffect, useState } from 'react';

import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

import ResultItem from '../results/ResultItem';

import Chart from 'react-apexcharts';

const PatientDetails = props => {
  const _id = props.match.params.id;

  const listContext = useContext(ListContext);
  const { patientViewed, viewPatient } = listContext;

  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;

  useEffect(() => {
    loadUser();
    viewPatient(_id);
    // eslint-disable-next-line
  }, []);

  const [state, setState] = useState({
    options: {
      chart: {
        id: 'apexchart-results'
      },
      xaxis: {
        categories: [
          '1-2',
          '2-3',
          '3-4',
          '4-5',
          '5-6',
          '6-7',
          '7-8',
          '8-9',
          '9-10',
          '10-11',
          '11-12',
          '12-13',
          '13-14',
          '14-15',
          '15-16',
          '16-17',
          '17-18',
          '18-19',
          '19-20',
          '20-21',
          '21-22',
          '22-23',
          '23-24',
          '24-25',
          '25-END'
        ]
      },
      markers: {
        size: 6,
        strokeWidth: 3,
        fillOpacity: 0,
        strokeOpacity: 0,
        hover: {
          size: 8
        }
      },
      yaxis: {
        tickAmount: 5,
        min: 0
      }
    },
    series: [
      {
        name: 'Average',
        type: 'line',
        data: [550, 802, 1430, 1233, 1343, 2211, 1426, 1511]
      }
    ]
  });

  const setShow = result => {
    if (state.series.some(entry => entry.name === result.date)) {
      alert('Result was already added la dey');
      return;
    }
    setState({
      ...state,
      series: [
        ...state.series,
        {
          name: result.date,
          type: 'line',
          data: result.timings
        }
      ]
    });
  };

  return (
    <Fragment>
      {user ? (
        <Fragment>
          {user._id === _id || user.assignedUsers.includes(_id) ? (
            <Fragment>
              <h1 className="text-primary text-left">
                {patientViewed ? (
                  <div>
                    <Fragment>
                      {patientViewed.name}
                      <button
                        style={{ float: 'right' }}
                        onClick={props.history.goBack}
                      >
                        Back
                      </button>
                    </Fragment>
                    <Fragment>
                      <Chart
                        options={state.options}
                        series={state.series}
                        type="line"
                        height={350}
                      />
                      {patientViewed.results.length > 0
                        ? patientViewed.results.map(result => (
                            <Fragment>
                              <ResultItem
                                key={result._id}
                                result={result}
                                showDelete={false}
                              ></ResultItem>
                              <button
                                onClick={() => {
                                  setShow(result);
                                }}
                              >
                                Add to Graph
                              </button>
                            </Fragment>
                          ))
                        : null}
                    </Fragment>
                  </div>
                ) : null}
              </h1>
            </Fragment>
          ) : (
            <Fragment>
              <h1>You do not have access to this user's data.</h1>
            </Fragment>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default PatientDetails;
