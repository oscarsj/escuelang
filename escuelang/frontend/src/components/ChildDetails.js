import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Button } from 'react-bootstrap';

const ChildDetails = ({child, fieldTranslations, readOnly, onChildUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newChildDetails, setNewChildDetails] = useState(child);
    const onToggleEnable = (event) => {
        setEditMode(!editMode);
        event.preventDefault();
        event.stopPropagation();
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
    <Form onSubmit={editMode? onChildUpdated:onToggleEnable}>
        <InputChild 
            child={newChildDetails} 
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}/>

        {getButtons()}
    </Form>
    </div>
    )
}

export default ChildDetails;