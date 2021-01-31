import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import InputChild from './InputChild';
import InputRegister from './InputRegister';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import trans from '../translations';
import store from '../store';


const EditableRegister = ({register, onRegisterUpdated, onRegisterDeleted}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newRegister, setNewRegisterPrivate] = useState(register);
    const lang = store.useSettingsStore((state) => state.language);  
    const [error, setError] = useState();
    const [errors, setErrors] = useState({});
  
    const setNewChild = (newChild) => {
        setNewRegisterPrivate({...newRegister,
        child: newChild});
    }
    const setNewRegister = (reg) => {
        setNewRegisterPrivate({...reg, child: newRegister.child});
    }
    const onSuccess = () => {
        setNewRegister(register);
        setError();
        setErrors({});
        setEditMode(false);
    }
    const onFailure = (newError, newErrors={}) => {
        console.log('Error editing register: ', newError);
        setError(newError);
        setErrors(newErrors);
        setEditMode(true);
    }
    const handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onRegisterUpdated(newRegister, onSuccess, onFailure);
    }

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setNewRegisterPrivate(register);
        console.log("Resetting original register ", register);
        setError();
        setErrors({});
        setEditMode(false);

      }

      const cancelDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("Delete canceled");
        setShowDelete(false);
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setShowDelete(false);
        onRegisterDeleted(newRegister);
    }

    const confirmDelete = (event) => { 
        event.stopPropagation();
        event.preventDefault();
        console.log("Opening delete confirmation");
        setShowDelete(true)
    }
    
    return (<>
    <Modal show={showDelete} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{trans.seasonTranslations[lang].confirmDeleteRegisterTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{trans.seasonTranslations[lang].confirmDeleteRegister}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
        <Form onSubmit={handleSubmit}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newRegister.child.id}
            child={newRegister.child} 
            onChildUpdated={setNewChild}
            readOnly={!editMode}
            errors={errors}/>
        <InputRegister 
            key={newRegister.id}
            register={newRegister} 
            onRegisterUpdated={setNewRegister}
            readOnly={!editMode}
            errors={errors}/>

        <EditSaveCancelButtons 
          editMode={editMode}
          onSetEditMode={setEditMode} 
          onDelete={confirmDelete}
          onCancel={handleCancelEdit}/>
    </Form>
    </>
    )
}

export default EditableRegister;