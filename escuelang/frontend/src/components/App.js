import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/seasons/active/children")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
<>
  <h1> Escuela de Fútbol </h1>
  <h2> Temporada actual</h2>
  <table>
    <thead>Alumno</thead>
        {this.state.data.map(register => {
          return (
            <tr key={register.id}>
              {register.child.name} {register.child.surname}
            </tr>
          );
        })}
      </table>
</>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
