import React, { useState } from "react";
import ChildrenList from "./ChildrenList";
import InputChild from "./InputChild";


const App = (props) => {
  const [children, setChildren] = useState([])
  const addChild = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  const [newChild, addNewChild] = useState(
      {name: 'Nombre',
      surname: 'Apellido',
      address: 'Direccion',
      postcode: 'Código Postal',
      dni: 'DNI'}
  )

  const handleChange = (field) =>
      (event) => {
          let child = {...newChild};
          child[field] = event.target.value;
          addNewChild(child);
      }

  fetch("api/children")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        setChildren(data)
      });

  return (
  <>
    <h1> Escuela de Fútbol </h1>
    <h2> Temporada actual</h2>
    <ChildrenList children={children}/>
    <form onSubmit={addChild}>
        <InputChild child={newChild} onChange={handleChange} />
    </form>
  </>
  );
}

export default App;
