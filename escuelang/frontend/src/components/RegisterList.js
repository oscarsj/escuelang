import React, { useState } from 'react';
import Register from "./Register";
import VisibleFieldsSelector from './VisibleFieldsSelector';
import { BsCaretDown, BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'
import { Table } from 'react-bootstrap'


const RegisterList = ({registers, fieldTranslations}) => {
  console.log('Register list for ', registers);
  const [visibleFields, setVisibleFields] = useState(
    {
      'child': ['name', 'surname', 'birthdate','age'],
      'register': ['monitor']
    }
  );
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
    if (a[orderBy.child.field] == null) return orderBy.reversed?-1 : 1;
    if (b[orderBy.child.field] == null) return orderBy.reversed? 1 : -1;
    if (typeof(a[orderBy.child.field]) != 'string') return a[orderBy.child.field] < (b[orderBy.child.field])? (orderBy.reversed? -1 : 1) : (orderBy.reversed? 1 : -1)
    return a[orderBy.child.field].localeCompare(b[orderBy.child.field])==1? (orderBy.reversed? -1 : 1) : (orderBy.reversed? 1 : -1)
  }

  const flattenFields = (fields) => {
    return fields.child.concat(fields.register);
  }
  const allFieldTranslations = Object.assign({}, fieldTranslations.child, fieldTranslations.register)
  return (
     <div className="container">
       <VisibleFieldsSelector className="float-left" initialFields={flattenFields(visibleFields)} onSubmit={setVisibleFields} translations={allFieldTranslations}/>
    <Table striped bordered hover>
      <thead>
        <tr>
        {(flattenFields(visibleFields).map((field) => {
          return <th key={`header-${field}`} className="text-muted">{allFieldTranslations[field]}<a onClick={handleOnClick(field)} href="#">{getIcon(field)}</a></th>;
        }))}
        </tr>
      </thead>
      <tbody>
        {registers && registers
          .sort(sortByField)
          .map((register) =>
        <Register 
           key={register.id}
           register={register}
           visibleFields={visibleFields}
           fieldTranslations={fieldTranslations}/>
      )}
      </tbody>
    </Table>
    </div>
  )
}

export default RegisterList;