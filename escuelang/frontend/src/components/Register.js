import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import InputChild from './InputChild';
import InputRegister from './InputRegister';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import store from '../store';
import trans from '../translations';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';

const Register = ({register, visibleFields}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [rolledOut, setRolledOut] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newRegister, setNewRegisterPrivate] = useState(register);
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const lang = store.useSettingsStore((state) => state.language);  
  const storeReplaceRegister = store.useRegistersStore(state => state.replaceRegister)
  const storeDeleteRegister = store.useRegistersStore(state => state.deleteRegister);
  
  const setNewChild = (newChild) => {
      setNewRegisterPrivate({...newRegister,
          child: newChild});
  }
  const setNewRegister = (register) => {
    setNewRegisterPrivate({...register, child: newRegister.child});
  }
  const handleError = (err) => {
    if (err.response) {
        console.log('Error in update register', err.response);
        setError("Ha habido errores al guardar. Revise los valores introducidos");
        setErrors(err.response.data);
    } else if (err.request) {
        // client never received a response, or request never left
    } else {
        // anything else
    }
  }
  const onRegisterSaved = (event) => {
    event.stopPropagation();
    event.preventDefault();
    childrenApi
      .update(newRegister.child.id, newRegister.child)
      .then((resultChild) => {
        setNewChild(resultChild);
        const tmpRegister = {
            ...newRegister,
            child: resultChild.id};
        seasonsApi
        .updateRegister(tmpRegister.id, tmpRegister)
        .then((resultRegister) => {
            setRolledOut(false);
            setEditMode(false);
            const tmpRegister = {
              ...resultRegister,
              child: resultChild}
            storeReplaceRegister(tmpRegister);
            setNewRegister(tmpRegister);
          })
        .catch(handleError)
    })
  }

  const onRegisterDeleted = (event) => {
    event.stopPropagation();
    event.preventDefault();
      console.log("deleting register ", newRegister.id);
      seasonsApi
        .deleteRegister(newRegister.id)
        .then(() => {
          console.log("Register page deleted register ", newRegister.id);
          setRolledOut(false);
          setEditMode(false);
          storeDeleteRegister(newRegister.id);
        })
        .catch(handleError)
  }
  const handleCancelEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setNewChild(register.child);
    setNewRegister(register);
    console.log("Resetting original register ", register);
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
          <Modal.Title>{trans.seasonTranslations[lang].confirmDeleteRegisterTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{trans.seasonTranslations[lang].confirmDeleteRegister}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onRegisterDeleted}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td${newRegister.child[field]}`}>{newRegister.child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${newRegister[field]}`}>{field=='competition'? (newRegister[field]? 'Sí':'No'):newRegister[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${newRegister.child.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={onRegisterSaved}>
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
          onDelete={(event) => setShowDelete(true)}
          onCancel={handleCancelEdit}/>
    </Form>
    </div>
    </td></tr>))}   
</> 
)
}

export default Register;