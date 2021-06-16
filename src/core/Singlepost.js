import React,{useState,useEffect} from 'react';
import { isAutheticated } from '../auth/helper';
import Base from './Base';
import {  getPostById } from "./helper/coreapicalls";





const Singlepost = ({match}) => {
  

    const [values,setValues] = useState({
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

    const preload = (postId) => {
        getPostById(postId).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
                ...values,
                title:data.title,
                content: data.content,
                conclusion: data.conclusion,
                category:data.category
               
               
             });
          }
        });
      };
    
      useEffect(() => {
        preload(match.params.postId);
      }, []);


    return (
        <Base title="Blog " description=" ">
        <div className="container d-flex justify-content-center  ">
        
        <div className="jumbotron page ">
  <h1 className="display-4">{title}</h1>
  <hr className="my-4"/>
  <p className="lead">{content}</p>
  
  <p>{conclusion}</p>
  <hr className="my-4"/>

  <p className="lead">
   <span className="badge badge-warning">{category.name}</span>{""}
   

 </p>
</div>
</div>
</Base>

    )
}

export default  Singlepost;
