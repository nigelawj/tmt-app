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
    <div className="card text-center" style={{margin: "0 auto", width:"500px",paddingTop:"16px",paddingLeft:"16px",paddingRight:"16px"}}>
      <h5 className="card-title text-center">
        {name}
        <br></br>
        {user ? (
          <FormControlLabel
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
      </h5>
    </div>
  );
};

export default DoctorItem;
