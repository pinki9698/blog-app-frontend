import React from "react";

import {  Link } from "react-router-dom";


const Card = ({ post }) => {
  const postTitle = post ? post.title : "A blog title";
  const postBody = post ? post.body : "Post body";
  //const postConclusion = post ? post.conclusion : "Conclusion";
  //const postCategory = post ? post.category : "Not categorized";

  return (
    <div className="card  ">
      <div className="card-header lead">
        <h4 className="text-muted">
          {postTitle}
        
        </h4>
     
      </div>
      <div className="card-body">
      
    
      <Link to={`/post/${post._id}`}><button className="btn btn-primary">
         Visit Blog 
        </button></Link>
      </div>
    </div>
  );
};

export default Card;
