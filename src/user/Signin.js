import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect} from "react-router-dom";
import { signin, authenticate,isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    
    email: "",
    password: "",
    error: "",
    loading:false,
    didRedirect: false
  });

  const {  email, password, error, loading, didRedirect } = values;
  const {user} = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({  email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading:false });
        } else {
          authenticate(data, ()=>{
            setValues({
              ...values,
              didRedirect:true,
              
            });
          })
          
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () =>{
    if(didRedirect){
      if(user){
        return <Redirect to = "/user/dashboard" />;
      }
    }
    if(isAutheticated()){
      return <Redirect to="/"/>;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-primary btn-block">
             Login 
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
        <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Login " description="Nice to see You !!!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
     
    </Base>
  );
};

export default Signin;
