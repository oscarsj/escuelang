import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import InputChild from './InputChild';
import childrenApi from '../client/children';


const AddChildForm = ({onNewChild, fieldTranslations}) => {
    const [newChild, setNewChild] = useState(fieldTranslations);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    
    const postNewChild = (event) => {
        
        // Simple POST request with a JSON body using fetch
        console.log("Posting new child", newChild);
        event.stopPropagation();
        event.preventDefault();
        childrenApi
          .create(newChild)
          .then(child => {
            console.log('Child created!');
            setNewChild(fieldTranslations);
            setMessage("Alumno añadido!");
            setError("");
            onNewChild(child);
          })
          .catch(err => {
            if (err.response) {
                console.log('Error in create child', err);
                setMessage("");
                setError("Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
                setNewChild(err.response.data);
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })
    }

    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={postNewChild}>
    {(error && <Alert variant="danger">{error}</Alert>)}
    {(message && <Alert variant="success">{message}</Alert>)}
      <InputChild 
        child={newChild} 
        onChange={setNewChild} 
        fieldTranslations={fieldTranslations} 
        readOnly={false}/>

    <Button id='new' variant="primary" type="submit">Guardar</Button>
    </Form>
    </div>
    )
}

export default AddChildForm;