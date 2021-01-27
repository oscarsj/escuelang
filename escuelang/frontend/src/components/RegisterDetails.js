import React, {useState} from 'react';
import InputChild from './InputChild';
import InputRegister from './InputRegister';
import { Form, Alert } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';


const RegisterDetails = ({register, fieldTranslations, readOnly, onRegisterUpdated, onRegisterDeleted, allDays, allMonitors}) => {
    const [editMode, setEditMode] = useState(!readOnly);
    const [newRegister, setNewRegister] = useState(register);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    
    const setNewChild = (newChild) => {
        setNewRegister({...newRegister,
            child: newChild});
    }

    const handleRegisterDeleted = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("calling register deleted: ", register.id);
        onRegisterDeleted(newRegister.id);
           
    }
    const handleChildUpdated = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("register updated: ", event.target);
        onRegisterUpdated(newRegister.id);
    }

    return (
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={handleChildUpdated}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newRegister.child.id}
            child={newRegister.child} 
            onChildUpdated={setNewChild}
            fieldTranslations={fieldTranslations.child} 
            readOnly={!editMode}
            errors={errors}/>
        <InputRegister 
            key={newRegister.id}
            register={newRegister} 
            onRegisterUpdated={setNewRegister}
            fieldTranslations={fieldTranslations} 
            readOnly={!editMode}
            errors={errors}
            allDays={allDays}
            allMonitors={allMonitors}/>

        <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode} onDelete={handleRegisterDeleted}/>
    </Form>
    </div>
    )
}

export default RegisterDetails;