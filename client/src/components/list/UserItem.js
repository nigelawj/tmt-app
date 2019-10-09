import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ assignedUser }) => {
  const { _id, name } = assignedUser;

  return (
    <div className="card text-center" style={{margin: "0 auto", width:"500px"}}>
      <div class="card-header bg-info"> <h4><span class="badge badge-info"> {name}</span></h4></div>
      <div class="card-body">
        <Link to={`/${_id}`}>
          <button type="button" className="btn btn-success">Show More</button>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
