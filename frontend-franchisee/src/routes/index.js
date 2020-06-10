import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";
import { ForgotPassword, ResetPassword } from "../pages/Password";
import Documentation from "../pages/Documentation";
import Profile from "../pages/Profile";

import Error404 from "../pages/404Error";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />

      <Route path="/forgot_password" exact component={ForgotPassword} />
      <Route
        path="/reset_password/:resetToken"
        exact
        component={ResetPassword}
      />

      <Route path="/" exact component={Documentation} isPrivate />
      <Route path="/doc/:id" exact component={Documentation} isPrivate />

      <Route path="/profile" exact component={Profile} isPrivate />

      <Route path="/" component={Error404} />
    </Switch>
  );
}
