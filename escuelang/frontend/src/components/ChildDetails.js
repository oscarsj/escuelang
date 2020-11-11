import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Button } from 'react-bootstrap';

const ChildDetails = ({child, translations, readOnly, onChildUpdated}) => {
    const [editMode, setEditMode] = useState(!readOnly);

    const onToggleEnable = () => {
        setEditMode(!editMode);
    }

    const getButtons = () => {
        editMode? 
        (<>
            <Button id='update' variant="primary" type="submit">Guardar</Button>
            <Button id='cancel' variant="secondary" type="submit">Cancelar</Button>
        </>)
          : 
        (<Button id='enable' variant="primary" type="submit">Actualizar</Button>) 
         
    }
    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={editMode? onChildUpdated:onToggleEnable}>

        <InputChild 
            child={child} 
            fieldTranslations={translations} 
            readOnly={editMode}/>

        {getButtons()}
    </Form>
    </div>
    )
}

export default ChildDetails;