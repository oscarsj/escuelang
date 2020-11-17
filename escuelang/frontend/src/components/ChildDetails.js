import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Alert } from 'react-bootstrap';
import childrenApi from '../client/children';
import EditSaveCancelButtons from './EditSaveCancelButtons';


const ChildDetails = ({child, fieldTranslations, readOnly, onChildUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newChild, setNewChild] = useState(child);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    
    const handleChildUpdated = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("child updated: ", event.target);
        childrenApi
          .update(newChild.id, newChild)
          .then((result) => {
              setEditMode(false);
              setErrors({});
              setError("");
              onChildUpdated(result);
          })
          .catch(err => {
            if (err.response) {
                console.log('Error in update child', err.response);
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
            key={newChild.id}
            child={newChild} 
            onChildUpdated={setNewChild} 
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}
            errors={errors}/>

        <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode}/>
    </Form>
    </div>
    )
}

export default ChildDetails;