import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { deletePost, getPosts } from "./helper/writeHelper";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);



  const preload = () => {
    getPosts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisPost = postId => {
      deletePost(postId).then(
          data=>{
            if (data.error) {
                console.log(data.error);
              } else {
                  alert("This post will be deleted permanently ?");
                preload();
              }
          }
      )
  }
  return (
    <Base title=" " description="Manage your posts here">
      <h2 className="mb-4">All posts:</h2>
      <div className=" container">
      <div className=" row">
        <div className="col-12">
         

          {posts.map((post, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{post.title}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/myblogs/${post._id}`}
                  ><span onClick={()=>{}}> Update Post</span>
                  
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisPost(post._id);
                    }}
                    className="btn btn-danger"
                  >
                    <i class="fas fa-trash-alt">Delete</i>
                  </button>
                  <hr/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </Base>
  );
}
