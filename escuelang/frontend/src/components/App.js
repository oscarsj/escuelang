import React from "react";
import SeasonPage from './SeasonPage';
import OldChildrenPage from './OldChildrenPage';
import EscuelaNavbar from "./EscuelaNavbar";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";


const App = () => {
  return (
<div className="container">
<Router>
  <EscuelaNavbar title="Escuela de Fútbol"/>
  <div className="container center-block">
      <Switch>
        <Route exact path="/reports">
        </Route>
        <Route exact path="/">
          <SeasonPage/>
        </Route>
        <Route exact path="/children">
          <OldChildrenPage/>
        </Route>
      </Switch>
      <div>
        <i>Escuela de Fútbol 2020</i>
      </div>
  </div>
  </Router>
</div>
  );
}

export default App;
