import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/orfanatos" component={OrphanagesMap} />
        <Route path="/orfanato/:id" component={Orphanage} />
        <Route path="/criar-orfanato" component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
