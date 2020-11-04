import React, {useEffect, useState} from "react";
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

  const postNewChild = (event) => {
    // Simple POST request with a JSON body using fetch
    event.preventDefault();
    console.log('New child: ', event.target.child);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.target.child),
    };
    fetch('api/children/', requestOptions)
        .then(response => {
            if (response.status > 400) {
                alert("Something went wrong!");
            }
            return response.json();
        })
        .then(data => this.setState({ postId: data.id }));
    }

  const handleChange = (field) =>
      (event) => {
          let child = {...newChild};
          child[field] = event.target.value;
          addNewChild(child);
      }
  useEffect(() => {
      fetch("api/children/")
          .then(response => {
              if (response.status > 400) {
                  alert("Something went wrong!");
              }
              return response.json();
          })
          .then(data => {
              setChildren(data)
      });
  }, []);

  return (
  <>
    <h1> Escuela de Fútbol </h1>
    <h2> Temporada actual</h2>
    <ChildrenList children={children}/>
    <form onSubmit={postNewChild}>
        <InputChild child={newChild} onChange={handleChange}/>
    </form>
  </>
  );
}

export default App;
