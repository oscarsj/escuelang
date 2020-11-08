import React, {useEffect, useState} from "react";
import { Alert } from 'react-bootstrap';
import ChildrenList from "./ChildrenList";
import InputChild from "./InputChild";
import EscuelaNavbar from "./EscuelaNavbar";
import childrenApi from "../client/children";
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";


const App = (props) => {
  const [season, setSeason] = useState(props.season);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [children, setChildren] = useState(props.children)
  const [oldChildren, setOldChildren] = useState("")

  const [newChild, setNewChild] = useState({
      name: 'Nombre',
      surname: 'Apellido',
      address: 'Direccion',
      postcode: 'Código Postal',
      dni: 'DNI'
    })

  const postNewChild = (event) => {
    // Simple POST request with a JSON body using fetch
    event.preventDefault();
    childrenApi
      .create(newChild)
      .then(child => {
        setNewChild(child);
        setChildren(children.concat(child))
        setMessage("Alumno añadido!");
        setError("");
      })
      .catch(err => {
        if (err.response) {
            console.log('Error in create child', err);
            setError("Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
            setNewChild(err.response.data);
        } else if (err.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
      })
  }
  const fetchOldChildren = () => {
    childrenApi
      .getAll()
      .then(children => setOldChildren(children))
  }

  useEffect(() => {
     fetchOldChildren();
  }, []);

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
        <div className="h1 center-block">Temporada actual</div>
          <InputChild child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
          <ChildrenList children={children}/>
        </Route>
        <Route exact path="/children">
        <div className="h1 center-block">Antiguos alumnos</div>
          <InputChild child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
          <ChildrenList children={oldChildren}/>
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
