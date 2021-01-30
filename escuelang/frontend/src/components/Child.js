import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import trans from "../translations";
import store from "../store";
import InputChild from './InputChild';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import childrenApi from '../client/children';

const Child = ({child, visibleFields}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newChild, setNewChild] = useState(child);
    const replaceChild = store.useOldChildrenStore((state) => state.replaceChild)
    const deleteChild = store.useOldChildrenStore((state) => state.deleteChild)
    
    const lang = store.useSettingsStore((state) => state.language);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    const errorHandler = (err) => {
        if (err.response) {
            console.log('Error in update child', err.response);
            setError("Ha habido errores al guardar. Revise los valores introducidos");
            setErrors(err.response.data);
        } else if (err.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }

    const onChildSaved = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log(`child updated: ${newChild.name} ${newChild.surname}`);
        childrenApi
          .update(newChild.id, newChild)
          .then((result) => {
              setErrors({});
              setError("");
              setRolledOut(false);
              setEditMode(false);
              setNewChild(result);
              replaceChild(result);
          })
          .catch(errorHandler)
    }
    const onChildDeleted = (event) => {
        event.stopPropagation();
        event.preventDefault();
        childrenApi
            .deleteChild(newChild.id)
            .then(() => {
                deleteChild(newChild.id)
                console.log("OldChildren page deleted child ", childId);
                setErrors({});
                setError("");
                setRolledOut(false);
                setEditMode(false);
                setNewChild({});
                setShowDelete(false);
            })
            .catch(errorHandler)
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
          <Button variant="primary" onClick={onChildDeleted}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={onChildSaved}>
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
            onDelete={(event) => setShowDelete(true)}
            onCancel={handleCancelEdit}/>
    </Form>
    </div>
    </td></tr>))}   
</> 
)
    }

export default Child;
