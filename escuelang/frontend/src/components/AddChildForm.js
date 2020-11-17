import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import InputChild from './InputChild';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';


const AddChildForm = ({onNewChild, fieldTranslations}) => {
    const [newChild, setNewChild] = useState({});
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [unrolled, setUnrolled] = useState(false);
    
    const postNewChild = (event) => {
        
        // Simple POST request with a JSON body using fetch
        console.log("Posting new child", newChild);
        event.stopPropagation();
        event.preventDefault();
        childrenApi
          .create(newChild)
          .then(child => {
            console.log('Child created!');
            setNewChild(fieldTranslations.child);
            setError("");
            setUnrolled(event.target.id == 'another');
            onNewChild(child);
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
    const postNewRegister = (event) => {
        
      // Simple POST request with a JSON body using fetch
      console.log("Posting new child", newChild);
      event.stopPropagation();
      event.preventDefault();
      seasons
        .create(seasonId, newRegister)
        .then(register => {
          console.log('Child created!');
          setNewChild(fieldTranslations.child);
          setError("");
          setUnrolled(event.target.id == 'another');
          onNewChild(child);
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

    return (<>
    {!unrolled && <div style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}><Button type="primary" onClick={() => setUnrolled(true)} style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}} size='sm'><AiOutlineUsergroupAdd/>Añadir alumnos</Button></div>}
    {unrolled && <>
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={postNewChild}>
    {(error && <Alert variant="danger">{error}</Alert>)}
      <InputChild 
        child={newChild} 
        onChildUpdated={setNewChild} 
        fieldTranslations={fieldTranslations.child} 
        readOnly={false}
        errors={errors}/>
      <InputRegister
        register={newRegister}
        onRegisterUpdated={onRegisterUpdated}
        fieldTranslations={fieldTranslations.register}
        readOnly={false}
        errors={registerErrors}/>

    <Button id='new' variant="primary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
    <Button id='another' variant="secondary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar y añadir otro</Button>
    <Button id='cancel' variant="secondary" onClick={()=>setUnrolled(false)} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Cancelar</Button>
    
    </Form>
    </div></>}
    </>
    )
}

export default AddChildForm;