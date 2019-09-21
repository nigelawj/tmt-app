import React, { useState, useContext } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

import { FormControlLabel, Switch } from '@material-ui/core';

const DoctorItem = ({ doctor, shared }) => {
  const listContext = useContext(ListContext);
  const { shareWithDoctor } = listContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { _id, name } = doctor; //doctor

  const [bool, setBool] = useState(shared);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {user ? (
          <FormControlLabel
            style={{ float: 'right' }}
            control={
              <Switch
                checked={bool}
                onChange={() => {
                  shareWithDoctor(_id);
                  bool ? setBool(false) : setBool(true);
                }}
              />
            }
            label={
              bool
                ? "Remove doctor's access to your results"
                : 'Share Results with this Doctor'
            }
            labelPlacement="start"
          />
        ) : null}
      </h3>
    </div>
  );
};

export default DoctorItem;
