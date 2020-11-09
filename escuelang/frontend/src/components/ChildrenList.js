import React, { useState } from "react";
import { Table } from 'react-bootstrap'
import Child from "./Child";
import VisibleFieldsSelector from './VisibleFieldsSelector';
import { BsCaretDown, BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'

const ChildrenList = ({children}) => {
  const [orderBy, setOrder] = useState({
    field:'surname',
    reversed: false}
  );
  const [visibleFields, setVisibleFields] = useState(
    ['name', 'surname', 'birthdate','dni']
  )
  const fieldTranslations = {
    name: 'Nombre', 
    surname: 'Apellidos',
    birthdate: 'Fecha de nacimiento',
    address: 'Dirección',
    town: 'Ciudad',
    school: 'Colegio',
    dni: 'DNI',
    email: 'email'
  }
  
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
        {(visibleFields.map((field) => {
          return <th className="text-muted">{fieldTranslations[field]}<a onClick={handleOnClick(field)} href="#">{getIcon(field)}</a></th>  ;
        }))}
        <th><VisibleFieldsSelector initialFields={visibleFields} onSubmit={setVisibleFields} translations={fieldTranslations}/></th>
        </tr>
      </thead>
        <tbody>
        {children && children
        .sort(sortByField)
        .map((child) =>
          <Child key={child.id} child={child} visibleFields={visibleFields}/>
        )}
      </tbody>
    </Table>
  )
}

export default ChildrenList;
