import React, {useState} from 'react';
import InputChild from './InputChild';
import { Form, Alert } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';


const ChildDetails = ({child, fieldTranslations, readOnly, onChildUpdated, onChildDeleted, error, errors}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newChild, setNewChild] = useState(child);
    const disableAndForward = (originalHandler, ...args) => {
        setEditMode(false);
        originalHandler(...args);
    } 
    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={(event) => disableAndForward(onChildUpdated, event, newChild)}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newChild.id}
            child={newChild} 
            onChildUpdated={setNewChild}
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}
            errors={errors}/>

        <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode} onDelete={(event) => disableAndForward(onChildDeleted, event, newChild.id)}/>
    </Form>
    </div>
    )
}

export default ChildDetails;