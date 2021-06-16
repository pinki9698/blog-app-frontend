import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Contact from "./core/Contact";

import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import Write from "./user/Write"
 import Singlepost from "./core/Singlepost"
import ManagePosts from "./user/ManagePosts";
import updatePost from "./user/UpdatePost";







const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Signin} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/user/dashboard" exact component={Profile} />
        <Route path="/myblogs" exact component={Write} />
        <Route path="/myblogs/:postId" exact component={updatePost} />


        <Route path="/post/modify" exact component={ManagePosts} />

        <Route path="/post/:postId" exact component={Singlepost} />
        




      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
