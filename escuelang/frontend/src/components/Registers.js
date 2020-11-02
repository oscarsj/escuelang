import React from "react";

const Registers = ({registers}) => {
  return (
  <table>
    <thead>Alumno</thead>
        {registers.map(register => {
          return (
            <tr key={register.id}>
              {register.child.name} {register.child.surname}
            </tr>
          );
        })}
      </table>
  )
}

export default Registers;