import React, { useState } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import {oldChildrenTranslations} from "../translations";
import InputChild from './InputChild';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import {useSettingsStore} from "../store";

const EditableChild = ({child, onChildUpdated, onChildDeleted, error, errors}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newChild, setNewChild] = useState(child);
    const lang = useSettingsStore((state) => state.language);
    const trans = oldChildrenTranslations[lang];
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
        setShowDelete(true)
    }
    return (<>
        <Modal show={showDelete} onHide={cancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>{trans.confirmDeleteChildTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{trans.confirmDeleteChild}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDelete}>
                {trans.cancel_button}
              </Button>
              <Button variant="primary" onClick={handleChildDeleted}>
              {trans.delete_button}
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