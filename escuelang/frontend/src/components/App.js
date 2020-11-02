import React, { useState } from "react";
import ChildrenList from "./ChildrenList";


const App = (props) => {
  const [children, setChildren] = useState([])
  const addChild = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
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
        <input id='name'/> <input id='surname' />
        <button type="submit">save</button>
  </form>
  </>
  );
}

export default App;
