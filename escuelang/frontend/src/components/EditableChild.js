import React, { useState } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import trans from "../translations";
import InputChild from './InputChild';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import store from "../store";


const EditableChild = ({child, onChildUpdated, onChildDeleted, error, errors}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newChild, setNewChild] = useState(child);
    const lang = store.useSettingsStore((state) => state.language);
    
    const handleChildUpdated = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setEditMode(false);
        onChildUpdated(newChild);
    }

    const handleChildDeleted = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setShowDelete(false);
        setEditMode(false);
        onChildDeleted(newChild);        
    }

    const handleCancelEdit = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setNewChild(child);
        console.log("Resetting original child ", child);
        setEditMode(false);
    }

    const cancelDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setShowDelete(false);
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
              <Modal.Title>{trans.oldChildrenTranslations[lang].confirmDeleteChildTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{trans.oldChildrenTranslations[lang].confirmDeleteChild}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDelete}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleChildDeleted}>
                Borrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Form onSubmit={handleChildUpdated}>
        {(error && <Alert variant="danger">{error}</Alert>)}
        <InputChild 
            key={newChild.id}
            child={newChild} 
            onChildUpdated={setNewChild}
            readOnly={!editMode}
            errors={errors}/>

        <EditSaveCancelButtons
            editMode={editMode}
            onSetEditMode={setEditMode}
            onDelete={confirmDelete}
            onCancel={handleCancelEdit}/>
    </Form>
    </>)
    
}

export default EditableChild;