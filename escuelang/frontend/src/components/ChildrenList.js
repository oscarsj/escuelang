import React from "react";
import Child from "./Child";

const ChildrenList = ({children}) => {
  return (
    <table>
      <thead>Alumno</thead>
        {children.map((child) =>
        <tr><Child key={child.id} child={child}/></tr>
      )}
    </table>
  )
}

export default ChildrenList;