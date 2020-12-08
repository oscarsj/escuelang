import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import InputRegister from './InputRegister';
import InputChild from './InputChild';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';


const AddRegisterForm = ({seasonId, onNewRegister, fieldTranslations}) => {
    const [newChild, setNewChild] = useState({});
    const [newRegister, setNewRegister] = useState({});
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [unrolled, setUnrolled] = useState(false);
    
    const postNewChild = (event) => {
        
        // Simple POST request with a JSON body using fetch
        console.log("Posting new child", newChild);
        event.stopPropagation();
        event.preventDefault();
        return childrenApi
          .create(newChild)
          .then(child => {
            console.log('Child created!');
            setNewChild(child);
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
    const postNewRegister = async (event) => {
        
      // Simple POST request with a JSON body using fetch
      console.log("Posting new register", newRegister);
      event.stopPropagation();
      event.preventDefault();
      postNewChild(event)
        .then(child => {
          seasonsApi
            .registerChild(seasonId, {
                ...newRegister,
                child: child.id
            })
            .then(register => {
                console.log('Register created!');
                setNewRegister({});
                setNewChild({});
                setError("");
                setUnrolled(event.target.id == 'another');
                console.log("Notifying upstream of addRegister");
                onNewRegister({
                    ...register,
                    child: child
                });
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
   
  }

  return (<>
    {!unrolled && <div style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}><Button type="primary" onClick={() => setUnrolled(true)} style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}} size='sm'><AiOutlineUsergroupAdd/>Añadir alumnos</Button></div>}
    {unrolled && <>
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={postNewRegister}>
    {(error && <Alert variant="danger">{error}</Alert>)}
      <InputChild 
        child={newChild} 
        onChildUpdated={setNewChild} 
        fieldTranslations={fieldTranslations.child} 
        readOnly={false}
        errors={errors}/>
      <InputRegister
        register={newRegister}
        onRegisterUpdated={setNewRegister}
        fieldTranslations={fieldTranslations}
        readOnly={false}
        errors={errors}/>

    <Button id='new' variant="primary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
    <Button id='another' variant="secondary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar y añadir otro</Button>
    <Button id='cancel' variant="secondary" onClick={()=>setUnrolled(false)} style={{ padding: "10px", marginRight: "10px"}} size='sm'>Cancelar</Button>
    
    </Form>
    </div></>}
    </>
    )
}

export default AddRegisterForm;