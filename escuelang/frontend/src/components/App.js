import React, {useEffect, useState} from "react";
import ChildrenList from "./ChildrenList";
import InputChild from "./InputChild";


const App = (props) => {
  function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  const csrftoken = readCookie('csrftoken');

  const [children, setChildren] = useState([])
  const defaultChild = {name: 'Nombre',
      surname: 'Apellido',
      address: 'Direccion',
      postcode: 'Código Postal',
      dni: 'DNI'}
  const [newChild, addNewChild] = useState(defaultChild)

  const postNewChild = (event) => {
    // Simple POST request with a JSON body using fetch
    event.preventDefault();
    console.log('New child: ', event.target.child);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(newChild),
    };
    fetch('api/children/', requestOptions)
        .then(response => {
            if (response.status > 400) {
                alert("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            addNewChild(defaultChild);
            fetchChildren();
        });
    }
  const fetchChildren = () => {
      fetch("api/children/")
          .then(response => {
              if (response.status > 400) {
                  alert("Something went wrong!");
              }
              return response.json();
          })
          .then(data => setChildren(data));
  }
  const handleChange = (field) =>
      (event) => {
          let child = {...newChild};
          child[field] = event.target.value;
          addNewChild(child);
      }

  useEffect(() => {
    fetchChildren();
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
