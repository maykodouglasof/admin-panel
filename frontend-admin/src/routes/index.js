import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";

import { ForgotPassword, ResetPassword } from "../pages/Password";

import { CategoryList, CategoryForm } from "../pages/Category";
import { DocumentList, DocumentForm } from "../pages/Document";
import { UserList, UserForm } from "../pages/User";

import Error404 from "../pages/404Error";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/forgot_password" exact component={ForgotPassword} />
      <Route
        path="/reset_password/:resetToken"
        exact
        component={ResetPassword}
      />

      <Route path="/categories" component={CategoryList} />
      <Route path="/category/new" component={CategoryForm} />
      <Route path="/category/edit/:id" component={CategoryForm} isPrivate />

      <Route path="/documents" component={DocumentList} />
      <Route path="/document/new" component={DocumentForm} />
      <Route path="/document/edit/:id" component={DocumentForm} />

      <Route path="/users" component={UserList} />
      <Route path="/user/new" component={UserForm} />
      <Route path="/user/edit/:id" component={UserForm} />

      <Route path="/" component={Error404} />
    </Switch>
  );
}
