import React from "react";
import { Table } from 'react-bootstrap'
import Child from "./Child";

const ChildrenList = ({children}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Fecha de nacimiento</th>
        <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        {children
        .sort((a, b) => a.surname > b.surname? 1 : -1)
        .map((child) =>
        <Child key={child.id} child={child}/>
      )}
      </tbody>
    </Table>
  )
}

export default ChildrenList;
