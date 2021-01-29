import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import InputRegister from './InputRegister';
import InputChild from './InputChild';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import store from '../store';

const AddRegisterForm = ({seasonId}) => {
  const [newRegister, setNewRegister] = useState({
    child: {},
    days: [],
    monitor: undefined,
    payment_set: []
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [unrolled, setUnrolled] = useState(false);
  
  const setNewChild = (child) => {
    console.log("AddRegisterForm setNewChild ", child);
    setNewRegister(
      {...newRegister,
      child: child});
  }
  const addRegister = store.useRegistersStore(state => state.addRegister);
  
  const updateChild = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("Updating child", newRegister.child);
    return childrenApi
      .update(newRegister.child.id, newRegister.child)
      .then(child => {
        console.log('Child updated!');
        setNewChild(child);
        setError("");
        return child;
      })
      .catch(err => {
        if (err.response) {
            console.log('Error in update child: ', err.response);
            const nonFieldErrors = err.response.data.non_field_errors;
            setError(nonFieldErrors || "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
            setErrors(err.response.data);
        } else if (err.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    })
  }
  const postNewChild = (event) => {
    event.stopPropagation();
    event.preventDefault();  
    console.log("Posting new child", newRegister.newChild);
    return childrenApi
        .create(newRegister.child)
        .then(child => {
          console.log('Child created!');
          setError("");
          return child;
        })
        .catch(err => {
          if (err.response) {
              console.log('Error in create child: ', err.response);
              const nonFieldErrors = err.response.data.non_field_errors;
              setError(nonFieldErrors || "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
              setErrors(err.response.data);
          } else if (err.request) {
              // client never received a response, or request never left
          } else {
              // anything else
          }
      })
  }
  const postNewRegister = (event, buttonId) => {        
    // Simple POST request with a JSON body using fetch
    console.log("Posting new register", newRegister);
    event.stopPropagation();
    event.preventDefault();
    const childPromise = newRegister.child.id == undefined? postNewChild(event): updateChild(event);
    childPromise.then(child => {
        seasonsApi
          .registerChild(seasonId, {
              ...newRegister,
              child: child.id
          })
          .then(register => {
              console.log('Register created!');
              const tmpRegister = {
                ...register,
                child: child
              }
              setNewRegister(tmpRegister);
              setError("");
              if(buttonId=='new') {
                setUnrolled(buttonId == 'another');
              }
              addRegister(tmpRegister);
              setNewRegister({});
          })
          .catch(err => {
              if (err.response) {
                  console.log('Error in create register: ', err.response);
                  const nonFieldErrors = err.response.data.non_field_errors;
                  setError(nonFieldErrors || "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
                  setErrors(err.response.data);
              } else if (err.request) {
                  // client never received a response, or request never left
              } else {
                  // anything else
              }
        })
    })
  }

  const fetchChild = (child) => {
    setNewChild(child);
    if(child.name != newRegister.child.name || child.surname != newRegister.child.surname) {
      childrenApi.search(child.name, child.surname)
        .then((fullChild) => {
          if(fullChild != undefined) {
            console.log("Setting new child ", fullChild);
            setNewChild(fullChild);
          }
        })
        .catch()
    }
    
  }
  const handleCancel = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setNewChild({});
    setNewRegister({});
    setUnrolled(false);
  }

  return (<>
    {!unrolled && <div style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}><Button type="primary" onClick={() => setUnrolled(true)} style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}} size='sm'><AiOutlineUsergroupAdd/>Añadir alumnos</Button></div>}
    {unrolled && <>
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={postNewRegister}>
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

    <Button id='new' variant="primary" onClick={(event)=>postNewRegister(event, "new")} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
    <Button id='another' variant="secondary" onClick={(event)=>postNewRegister(event, "another")} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar y añadir otro</Button>
    <Button id='cancel' variant="secondary" onClick={handleCancel} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Cancelar</Button>
    
    </Form>
    </div></>}
    </>
    )
}

export default AddRegisterForm;
