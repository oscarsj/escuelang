import React, {useEffect, useState} from "react";
import { Alert } from 'react-bootstrap';
import ChildrenList from "./ChildrenList";
import InputChild from "./InputChild";
import EscuelaNavbar from "./EscuelaNavbar";
import childrenApi from "../client/children";


const App = (props) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [children, setChildren] = useState([])

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
  const fetchChildren = () => {
    childrenApi
      .getAll()
      .then(children => setChildren(children))
  }

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
<div className="container">
  <EscuelaNavbar title="Escuela de Fútbol"/>
  <span className="h1 center-block text-center text-muted" style={{ marginBottom: 25 }}>Alumnos</span>
  {(error && <Alert variant="danger">{error}</Alert>)}
  {(message && <Alert variant="success">{message}</Alert>)}
  <div className="container center-block">
    <ChildrenList children={children}/>
    <InputChild child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
  </div>
</div>
  );
}

export default App;
