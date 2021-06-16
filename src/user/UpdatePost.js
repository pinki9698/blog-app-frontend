import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { getPostById } from "../core/helper/coreapicalls";
import {  getCategories ,updatePost} from "./helper/writeHelper";


const UpdatePost = ({match}) => {
 
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

const preloadCategoties = () => {
    getCategories().then(data=>{
        if(data.error){
            setValues({...values, error: data.error});
        }else{
            setValues({
                categories: data
            })
        }
    })
}

  const preload = (postId) => {
    getPostById(postId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values,
        title: data.title,
        content: data.content,
        conclusion: data.conclusion,
        category: data.category._id,
       
        
        });
        preloadCategoties();
      }
    });
  };



  useEffect(() => {
    preload(match.params.postId);
  },[]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error:"" });
 //TODO:
    updatePost(match.params.postId, {title, content, conclusion, category })
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
            Updated successfully.
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
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Update 
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Update your Post" description=" ">
      {successMessage()}
      {errorMessage()}
      {newPostForm()}
    </Base>
  );
};

export default UpdatePost;

