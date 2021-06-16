import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout,isAutheticated } from "../auth/helper";


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "blue" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      {isAutheticated() && (<Fragment>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/myblogs")}
          className="nav-link"
          to="/myblogs"
        >
          Write
        </Link>
      </li>
    
      <li className="nav-item">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard"
        >
           Profile
        </Link>
      </li>
      </Fragment>)}
      { !(isAutheticated()) && (<Fragment>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signup")}
          className="nav-link"
          to="/signup"
        >
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/login")}
          className="nav-link"
          to="/login"
        >
          Login
        </Link>
      </li>
      </Fragment>)}
      {isAutheticated() &&  (
        <li className="nav-item">
        <button
         
          className="nav-link btn sbtn"
          onClick={()=>{
            signout(()=>{
              history.push("/")
            })
          }}
        >
          Signout
        </button>
      </li>
      )}
       <li className="nav-item">
      <Link to="/contact" style={currentTab(history, "/contact")}
          className="nav-link"
          >Contact Us</Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
