import React, {useState} from 'react';
import InputChild from './InputChild';
import InputRegister from './InputRegister';
import { Form, Alert } from 'react-bootstrap';
import seasonsApi from '../client/seasons';
import EditSaveCancelButtons from './EditSaveCancelButtons';


const RegisterDetails = ({register, fieldTranslations, readOnly, onResgisterUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newRegister, setNewRegister] = useState(register);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    
    const handleChildUpdated = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("register updated: ", event.target);
        seasonsApi
          .updateRegister(newRegister.id, newRegister)
          .then((result) => {
              setEditMode(false);
              setErrors({});
              setError("");
              console.log("update on RegisterDetails: ", result)
              onRegisterUpdated(result);
          })
          .catch(err => {
            if (err.response) {
                console.log('Error in update register', err.response);
                setError("Ha habido errores al guardar. Revise los valores introducidos");
                setErrors(err.response.data);
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })
    }

    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={handleChildUpdated}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newRegister.child.id}
            child={newRegister.child} 
            onChildUpdated={setNewRegister}
            fieldTranslations={fieldTranslations.child} 
            readOnly={!editMode}
            errors={errors}/>
        <InputRegister 
            key={newRegister.id}
            register={newRegister} 
            onChildUpdated={setNewRegister}
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}
            errors={errors}/>

        <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode}/>
    </Form>
    </div>
    )
}

export default RegisterDetails;