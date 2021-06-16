import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Profile = () => {
  const {
    user: { name, email }
  } = isAutheticated();

  const profileLeftSide = () => {
    return (
      <div className="card ">
        <h4 className="card-header bg-dark text-white">Manage posts here: </h4>
        <ul className="list-group">
         
          
          <li className="list-group-item">
            <Link to="/post/modify" className="nav-link text-success">
            <i className="far fa-edit">Update</i> <i className="fas fa-trash-alt">Delete</i>
            </Link>
          </li>
          
        </ul>
      </div>
    );
  };

  const profileRightSide = () => {
    return (
      <div className="card mb-4 ">
        <h4 className="card-header">Profile Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email</span> {email}
          </li>

          
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to your profile"
      description="Manage all of your blogs here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div >{profileLeftSide()}</div>
        <div >{profileRightSide()}</div>
      </div>
    </Base>
  );
};

export default Profile;
