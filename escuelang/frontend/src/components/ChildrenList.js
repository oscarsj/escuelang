import React, { useState } from "react";
import { Table, Accordion } from 'react-bootstrap'
import Child from "./Child";
import { BsCaretDown, BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'

const ChildrenList = ({children}) => {
  const [orderBy, setOrder] = useState({
    field:'surname',
    reversed: false}
  );
  const handleOnClick = (field) => {
    return () => {
      setOrder({
          field: field,
          reversed: field==orderBy.field? !orderBy.reversed : orderBy.reversed
        })
    }
  }
  const getIcon = (field) =>
    orderBy.field==field?
      (orderBy.reversed? <BsCaretUpFill/>:<BsCaretDownFill/>) : <BsCaretDown/>

  const sortByField = (a, b) => {
    if (a[orderBy.field] == null) return orderBy.reversed?-1 : 1;
    if (b[orderBy.field] == null) return orderBy.reversed? 1 : -1;
    return a[orderBy.field].localeCompare(b[orderBy.field])==1? (orderBy.reversed? -1 : 1) : (orderBy.reversed? 1 : -1)
  }


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
        <th className="text-muted">Nombre<a onClick={handleOnClick('name')} href="#">{getIcon('name')}</a></th>
        <th className="text-muted">Apellidos<a onClick={handleOnClick('surname')} href="#">{getIcon('surname')}</a></th>
        <th className="text-muted">Fecha de nacimiento<a onClick={handleOnClick('birthdate')} href="#">{getIcon('birthdate')}</a></th>
        <th className="text-muted">Dirección<a onClick={handleOnClick('address')} href="#">{getIcon('address')}</a></th>
        </tr>
      </thead>
        <tbody>
        {children && children
        .sort(sortByField)
        .map((child) =>
          <Child key={child.id} child={child}/>
        )}
      </tbody>
    </Table>
  )
}

export default ChildrenList;
