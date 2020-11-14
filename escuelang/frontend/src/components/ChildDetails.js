import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Button, Alert } from 'react-bootstrap';
import childrenApi from '../client/children';
import { BsPencilSquare } from 'react-icons/bs'


const ChildDetails = ({child, fieldTranslations, readOnly, onChildUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newChild, setNewChild] = useState(child);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    
    const onToggleEnable = (event) => {
        setEditMode(!editMode);
        event.preventDefault();
        event.stopPropagation();
    }
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
    const getButtons = () => {
        return editMode? 
        (<>
            <Button id='update' variant="primary" type="submit" style={{ padding: "10px", marginRight: "10px"}} size='sm'>Guardar</Button>
            <Button id='cancel' variant="secondary" type="reset" style={{ padding: "10px"}} size='sm'>Cancelar</Button>
        </>)
          : 
        (<Button id='enable' variant="secondary" type="submit"><BsPencilSquare/></Button>) 
    }
    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={editMode? handleChildUpdated:onToggleEnable}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newChild.id}
            child={newChild} 
            onChildUpdated={setNewChild} 
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}
            errors={errors}/>

        {getButtons()}
    </Form>
    </div>
    )
}

export default ChildDetails;