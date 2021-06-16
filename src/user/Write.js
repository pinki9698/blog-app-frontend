import React, { useState, useEffect } from "react";

import Base from "../core/Base";

import { newpost, getCategories } from "./helper/writeHelper";
import { isAutheticated } from "../auth/helper/index";

const Write = () => {
  const { user, token } = isAutheticated();
  const [values, setValues] = useState({
    title: "",
    content: "",
    conclusion: "",
    category: "",
    categories: [],
   
    error: "",
    success: false,
  });

  const { title, content, conclusion, category, categories, error, success } =
    values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error:"" });
    newpost({ title, content, conclusion, category })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            title: "",
            content: "",
            conclusion: "",
            category: "",
            
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in uploading"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Created a new post successfully.
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

  const newPostForm = () => {
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Title</label>
              <input
                className="form-control"
                onChange={handleChange("title")}
                type="text"
                value={title}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Content</label>
              <textarea
                rows="5"
                className="form-control"
                onChange={handleChange("content")}
                type="text"
                // value={this.state.name ||''}
                value={content}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Conclusion</label>
              <textarea
                rows="3"
                onChange={handleChange("conclusion")}
                className="form-control"
                type="text"
                value={conclusion}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Category</label>
              <select
                onChange={handleChange("category")}
                className="form-control"
                placeholder="Category"
              >
                <option>Select</option>
                {categories &&
                  categories.map((cate, index) => (
                    <option key={index} value={cate._id}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div>
            <button onClick={onSubmit} className="btn btn-primary btn-block">
              Publish
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Create Post" description=" ">
      {successMessage()}
      {errorMessage()}
      {newPostForm()}
    </Base>
  );
};

export default Write;
