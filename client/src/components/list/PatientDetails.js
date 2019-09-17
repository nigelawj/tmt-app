import React, { Fragment, useContext, useEffect } from 'react';

import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

import { VictoryLine, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLegend } from 'victory';

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

  return (
    <div className="card bg-light">
      {user ? (
        <Fragment>
          {user._id === _id || user.assignedUsers.includes(_id) ? (
            <Fragment>
              <h1 className="text-primary text-left">
                {patientViewed ? (
                  <div>
                    {patientViewed.name}
                    <button
                      style={{ float: 'right' }}
                      onClick={props.history.goBack}
                    >
                      Back
                    </button>
                    <div>
                      {patientViewed.results.length > 0
                        ? patientViewed.results.map(result => (
                            <VictoryChart
                              theme={VictoryTheme.material}
                              containerComponent={<VictoryZoomContainer />}
                            >
                              <VictoryLegend
                                x={125}
                                y={50}
                                title="Legend"
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                style={{
                                  border: { stroke: 'black' },
                                  title: { fontSize: 20 }
                                }}
                                data={[
                                  {
                                    name: 'One',
                                    symbol: { fill: 'tomato', type: 'star' }
                                  },
                                  { name: 'Two', symbol: { fill: 'orange' } },
                                  { name: 'Three', symbol: { fill: 'gold' } }
                                ]}
                              />
                              <VictoryLine
                                style={{
                                  data: { stroke: '#c43a31' },
                                  parent: { border: '1px solid #ccc' }
                                }}
                                data={result.timings}
                              ></VictoryLine>
                            </VictoryChart>
                          ))
                        : null}
                    </div>
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
    </div>
  );
};

export default PatientDetails;
