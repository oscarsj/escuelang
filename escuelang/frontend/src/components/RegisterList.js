import React, {useState} from 'react';
import Register from "./Register";
import VisibleFieldsSelector from './VisibleFieldsSelector';
import { BsCaretDown, BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'
import { Table } from 'react-bootstrap'
import {useSettingsStore, useRegistersStore} from '../store';
import {allTranslations} from '../translations';


const RegisterList = () => {
  const lang = useSettingsStore(state=>state.language);  
  const fieldTranslations = allTranslations[lang];
  const registers = useRegistersStore((state) => state.registers);
  const [visibleFields, setVisibleFields] = useState(
    {
      'child': ['name', 'surname', 'birthdate','age'],
      'register': ['monitor']
    }
  );
  const handleSetVisibleFields = (visibleFieldsList) => {
    console.log("visibleFieldList changed: ", visibleFieldsList);
    setVisibleFields({
      child: visibleFieldsList.filter(field => Object.keys(fieldTranslations.child).includes(field)),
      register: visibleFieldsList.filter(field => Object.keys(fieldTranslations.register).includes(field))
    })
  }
  const [orderBy, setOrder] = useState({
    field: 'surname',
    reversed: false
  });
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
    if (a.child[orderBy.field] == null) return orderBy.reversed?-1 : 1;
    if (b.child[orderBy.field] == null) return orderBy.reversed? 1 : -1;
    if (typeof(a.child[orderBy.field]) != 'string') return a.child[orderBy.field] < (b.child[orderBy.field])? (orderBy.reversed? -1 : 1) : (orderBy.reversed? 1 : -1)
    return a.child[orderBy.field].localeCompare(b.child[orderBy.field])==1? (orderBy.reversed? -1 : 1) : (orderBy.reversed? 1 : -1)
  }

  const flattenFields = (fields) => {
    return fields.child.concat(fields.register);
  }
  const allFieldTranslations = Object.assign({}, fieldTranslations.child, fieldTranslations.register)

  return (
     <div className="container">
       <VisibleFieldsSelector 
         className="float-left" 
         initialFields={flattenFields(visibleFields)} 
         onSubmit={handleSetVisibleFields} 
         translations={allFieldTranslations}/>
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
           visibleFields={visibleFields}/>
      )}
      </tbody>
    </Table>
    </div>
  )
}

export default RegisterList;