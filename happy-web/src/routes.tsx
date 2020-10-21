import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";
import { isAuthenticated } from "./services/auth";
import Signup from "./pages/Signup";

interface IProps {
  component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signup", state: { from: props.location } }}
        />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        {/* <Route path="/login" component={} /> */}
        <Route path="/signup" component={Signup} />
        <PrivateRoute pathname="/orfanatos" component={OrphanagesMap} />
        <PrivateRoute pathname="/orfanato/:id" component={Orphanage} />
        <PrivateRoute pathname="/criar-orfanato" component={CreateOrphanage} />
        <Route path="*" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
