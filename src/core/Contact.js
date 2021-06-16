import React,{useState} from "react";
import { Link } from "react-router-dom";

import Base from "./Base";
import { contact } from "./helper/contactHelper";


const Contact = () => {

 const [values, setValues] = useState({
     name:"",
     email:"",
     institute:"",
     contactno:"",
     message:"",
     error:"",
     success:false
 });

 const {name,email,institute, contactno,message,error,success} =values;

 const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    contact({ name, email, institute, contactno, message })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            institute: "",
            contactno: "",
            message:"",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error sending message"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Message sent succesfully {" "}
            <Link to="/"> Back to home</Link>
          </div>
        </div>
      </div>
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

  const contactForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input 
              onChange={handleChange("name")}
                value={name}
              className="form-control" type="name" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input 
              onChange={handleChange("email")}
                value={email}
              className="form-control" type="email" />
            </div>

            <div className="form-group">
              <label className="text-light">Institute</label>
              <input
              onChange={handleChange("institute")}
                value={institute}
              className="form-control" type="institute" />
              </div>

              <div className="form-group">
                <label
                
                className="text-light">Contact no.</label>
                <input
                onChange={handleChange("contactno")}
                value={contactno}
                className="form-control" type="contactno" />
              </div>
            
            <div className="form-group">
              <label className="text-light">Message</label>
              <textarea 
              onChange={handleChange("message")}
              value={message}
              className="form-control" type="message" />
            </div>
            <button onClick={onSubmit} className="btn btn-primary btn-block">Submit 💌</button>
          </form>
        </div>
      </div>
    );
  };

  return <Base title="Contact Us" description=" ">
  {successMessage()}
  {errorMessage()}
  {contactForm()}
  
  </Base>;
};

export default Contact;
