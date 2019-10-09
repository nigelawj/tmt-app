import React, { Fragment, useContext, useEffect, useState } from 'react';

import ResultItem from './ResultItem';

import ResultsContext from '../../context/results/resultsContext';
import AlertContext from '../../context/alert/alertContext';

import Spinner from '../layout/Spinner';
import Chart from 'react-apexcharts';

const Results = () => {
  const resultsContext = useContext(ResultsContext);
  const { results, getResults, loading } = resultsContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

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
          '24-25'
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
        data: [
          550,
          802,
          1430,
          1254,
          1343,
          2054,
          1426,
          1511,
          802,
          1813,
          1426,
          1511,
          802,
          1426,
          1511,
          802,
          1430,
          1233,
          1343,
          1122,
          1324,
          1421,
          1126,
          1311
        ]
      }
    ]
  });

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, []);

  const setShow = result => {
    let name = `${result.date.substring(0, 10)} [${result.date.substring(
      11,
      19
    )}]`;
    if (state.series.some(entry => entry.name === name)) {
      setAlert('Result was already added to graph!', 'danger');
      return;
    }
    setState({
      ...state,
      series: [
        ...state.series,
        {
          name: name,
          type: 'line',
          data: result.timings
        }
      ]
    });
  };

  return (
    <Fragment>
      {results !== null && !loading ? (
        <Fragment>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
          {results.length > 0 ? (
            results.map((result, i) => (
              <Fragment key={result._id}>
                <ResultItem result={result} showDelete={true}></ResultItem>
                <div
                  className="container text-center"
                  style={{ paddingTop: '16px', paddingBottom: '32px' }}
                >
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      setShow(result);
                    }}
                  >
                    Add to Graph
                  </button>
                </div>
              </Fragment>
            ))
          ) : (
            <Fragment>
              <h1>No Results. Play a game?</h1>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Results;
