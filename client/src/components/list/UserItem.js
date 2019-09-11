import React, { useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';

const UserItem = ({ assignedUser }) => {
  const listContext = useContext(ListContext);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { name } = assignedUser;

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
      </h3>
    </div>
  );
};

export default UserItem;
