import React from "react";
import { Route, Switch } from "react-router-dom";
import NoMatch from "./containers/NoMatch";
import BooksContainer from "./containers/BooksContainer";

const Routes = () => (
  <Switch>
    <Route path="/" component={BooksContainer} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
