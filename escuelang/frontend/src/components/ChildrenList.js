import React from "react";
import { Table } from 'react-bootstrap'
import Child from "./Child";

const ChildrenList = ({children}) => {
  return (
    <Table striped>
      <thead>Alumno</thead>
      <tbody>
        {children.map((child) =>
        <tr key={child.id}><Child key={child.id} child={child}/></tr>
      )}
      </tbody>
    </Table>
  )
}

export default ChildrenList;
