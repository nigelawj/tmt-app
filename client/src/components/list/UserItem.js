import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ assignedUser }) => {
  const { _id, name } = assignedUser;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name} {_id}
        <Link to={`/${_id}`}>
          <button style={{ float: 'right' }}>More</button>
        </Link>
      </h3>
    </div>
  );
};

export default UserItem;
