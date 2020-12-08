import React, {useState, useEffect} from "react";
import { Alert } from 'react-bootstrap';
import SeasonPage from './SeasonPage';
import OldChildrenPage from './OldChildrenPage';
import EscuelaNavbar from "./EscuelaNavbar";
import allTranslations from "../translations";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";


const App = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const language = 'es_ES';
  const activeSeason = "1";
  // TODO: move this to proper string translations
  const translations = allTranslations[language];
  console.log("Got translations: ", translations);
  return (
<div className="container">
<Router>
  <EscuelaNavbar title="Escuela de Fútbol"/>
  {(error && <Alert variant="danger">{error}</Alert>)}
  {(message && <Alert variant="success">{message}</Alert>)}
  <div className="container center-block">
      <Switch>
        <Route exact path="/reports">
        </Route>
        <Route exact path="/">
          <SeasonPage 
            defaultSeason={activeSeason}
            fieldTranslations={translations} 
            setError={setError} 
            setMessage={setMessage}/>
        </Route>
        <Route exact path="/children">
          <OldChildrenPage 
            fieldTranslations={translations.child}/>
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
