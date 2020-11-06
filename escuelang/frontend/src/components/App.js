import React, {useEffect, useState} from "react";
import ChildrenList from "./ChildrenList";
import InputChild from "./InputChild";
import EscuelaNavbar from "./EscuelaNavbar";
import childrenApi from "../client/children";


const App = (props) => {
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
      })
      .catch(err => {
        if (err.response) {
            console.log('Error in create child', err);
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
    <h2> Temporada actual</h2>
    <ChildrenList children={children}/>
    <InputChild child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
</div>
  );
}

export default App;
