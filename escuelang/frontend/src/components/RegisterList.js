import React from "react";
import Register from "./Register";

const RegisterList = ({registers}) => {
  console.log('Register list for ', registers);
  registers.map(register => {
      console.log("Calling register ", register);
  });
  return (
    <table>
      <thead>Alumno</thead>
        {registers.map((register) =>
        <Register register={register}/>
      )}
    </table>
  )
}

export default RegisterList;