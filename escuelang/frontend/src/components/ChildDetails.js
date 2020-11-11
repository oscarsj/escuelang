import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Button, Alert } from 'react-bootstrap';
import childrenApi from '../client/children';

const ChildDetails = ({child, fieldTranslations, readOnly, onChildUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newChild, setNewChild] = useState(child);
    const [error, setError] = useState("");
    
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
              onChildUpdated(result);
              setEditMode(false);
          })
          .catch(err => {
            if (err.response) {
                console.log('Error in create child', err);
                setError("Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
                setNewChild(err.response.data);
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
            <Button id='update' variant="primary" type="submit">Guardar</Button>
            <Button id='cancel' variant="secondary" type="reset">Cancelar</Button>
        </>)
          : 
        (<Button id='enable' variant="primary" type="submit">Editar</Button>) 
    }
    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={editMode? handleChildUpdated:onToggleEnable}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            child={newChild} 
            onChildUpdated={setNewChild} 
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}/>

        {getButtons()}
    </Form>
    </div>
    )
}

export default ChildDetails;