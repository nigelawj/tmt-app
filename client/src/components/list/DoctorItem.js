import React, { useState, useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

const DoctorItem = ({ doctor, shared }) => {
  const listContext = useContext(ListContext);
  const { shareWithDoctor } = listContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { _id, name } = doctor; //doctor

  const [bool, setBool] = useState(null);

  useEffect(() => {
    setBool(shared);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} {_id.toString()}
        {user ? (
          <button
            style={{ float: 'right' }}
            onClick={() => {
              shareWithDoctor(_id);
              bool ? setBool(false) : setBool(true);
            }}
          >
            {bool
              ? "Remove doctor's access to your results"
              : 'Share Results with this Doctor'}
          </button>
        ) : null}
      </h3>
    </div>
  );
};

export default DoctorItem;
