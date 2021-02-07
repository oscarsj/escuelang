import React from 'react';

export class ListingRegister extends React.PureComponent {
    constructor(props) {
        super(props);
        this.registers = props.registers;
        this.assistance = props.assistance;
        this.inputRef = React.createRef();
      }
    
    render() {
      return (
        <table>
          <thead>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
          </thead>
          <tbody>
          {this.registers && this.registers.map((register) => 
            <tr>
              <td>{register.child.name}</td>
              <td>{register.child.surname}</td>
              <td>{register.child.age}</td>
              {this.assistance && (<td>datos de asistencia</td>)}
            </tr>)}
          </tbody>
        </table>
      );
    }
  }

export default ListingRegister;