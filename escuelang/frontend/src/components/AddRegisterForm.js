import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import InputRegister from './InputRegister';
import InputChild from './InputChild';
import childrenApi from '../client/children';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const initReg = {
  child: {},
  days: [],
  monitor: undefined,
  payments_set: []
}

const AddRegisterForm = ({defaultRegister, onRegisterAdded, onAddCanceled, error, errors}) => {

  const [newRegister, setNewRegisterPrivate] = useState(defaultRegister != undefined? defaultRegister:initReg);
  const [unrolled, setUnrolled] = useState(false);

  const setNewChild = (child) => {
    console.log("AddRegisterForm setNewChild ", child);
    setNewRegisterPrivate(
      {...newRegister,
      child: child});
  }
  const setNewRegister = (register) => {
    setNewRegisterPrivate({...register, child: newRegister.child});
  }
  const initRegister = () => {
    console.log("Resetting add register form contents...");
    setNewRegisterPrivate({...initReg, id: "added_register", child: {id: "added_child"}});
  }
  const handleRegisterAdded = (event, buttonId) => {        
    event.stopPropagation();
    event.preventDefault();
    if (buttonId != 'another') {
      setUnrolled(false);
    }
    onRegisterAdded(newRegister);
    initRegister();
  }

  const fetchChild = (child) => {
    setNewChild(child);
    setNewRegister({...newRegister, id: undefined});
    if(child.name != newRegister.child.name || child.surname != newRegister.child.surname) {
      childrenApi.search(child.name, child.surname)
        .then((fullChild) => {
          if(fullChild != undefined) {
            console.log("Setting new child ", fullChild);
            setNewChild(fullChild);
          } else {
            setNewChild({...child, id: undefined});
          }
        })
        .catch()
    } 
  }
  const handleCancel = (event) => {
    event.stopPropagation();
    event.preventDefault();
    initRegister();
    setUnrolled(false);
    onAddCanceled();
  }

  return (<>
  {!(unrolled || error) && <div style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}><Button type="primary" onClick={() => setUnrolled(true)} style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}} size='sm'><AiOutlineUsergroupAdd/>Añadir alumnos</Button></div>}
    {(unrolled || error) && <>
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>  
    
    <Form>
    {(error && <Alert variant="danger">{error}</Alert>)}
      <InputChild 
        key={newRegister.child.id} 
        child={newRegister.child} 
        onChildUpdated={fetchChild} 
        readOnly={false}
        errors={errors}/>
      <InputRegister
        key={`${newRegister.id}-${newRegister.child.id}`}
        register={newRegister}
        onRegisterUpdated={setNewRegister}
        readOnly={false}
        errors={errors}/>

    <Button id='new' variant="primary" onClick={(event)=>handleRegisterAdded(event, "new")} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
    <Button id='another' variant="secondary" onClick={(event)=>handleRegisterAdded(event, "another")} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar y añadir otro</Button>
    <Button id='cancel' variant="secondary" onClick={handleCancel} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Cancelar</Button>
    
    </Form>
    </div>
    </>}

    </>
    )
}

export default AddRegisterForm;
