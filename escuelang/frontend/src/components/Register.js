import React, {useState} from 'react';
import InputChild from './InputChild';
import InputRegister from './InputRegister';
import { Form, Alert } from 'react-bootstrap';
import EditSaveCancelButtons from './EditSaveCancelButtons';
import store from '../store';
import trans from '../translations';

const Register = ({register, visibleFields}) => {
  const [rolledOut, setRolledOut] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [newRegister, setNewRegister] = useState(register);
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const lang = store.useSettingsStore(state=>state.language);  
  const fieldTranslations = trans.allTranslations[lang];
  
  const storeReplaceRegister = store.useRegistersStore(state => state.replaceRegister)

  const setNewChild = (newChild) => {
      setNewRegister({...newRegister,
          child: newChild});
  }

  const onRegisterUpdated = (event, newRegister) => {
    event.stopPropagation();
    event.preventDefault();
    childrenApi
      .update(newRegister.child.id, newRegister.child)
      .then((result) => {
        console.log("update child on RegisterDetails: ", result)
        const tmpRegister = {
            ...newRegister,
            child: result.id};
        seasonsApi
        .updateRegister(tmpRegister.id, tmpRegister)
        .then((result) => {
            console.log("update on RegisterDetails: ", result)
            storeReplaceRegister(result);
          })
        .catch(err => {
            if (err.response) {
                console.log('Error in update register', err.response);
                setError("Ha habido errores al guardar. Revise los valores introducidos");
                setErrors(err.response.data);
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })
    })
  }

  const onRegisterDeleted = (event, registerId) => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm(trans.seasonTranslations.confirmDeleteRegister)) {
      seasonsApi
        .deleteRegister(registerId)
        .then((result) => {
          console.log("Season page deleted register ", registerId);
          setRegisters(registers.filter((register) => register.id != registerId));
        })
        .catch()
    }
  }

  const child = register.child;
  console.log("Register rendered: ", register);
  console.log("visible fields: ", visibleFields);
  const rollAndForward = (originalHandler) =>
   (...params) => {
    setRolledOut(false);
    return originalHandler(...params);
  } 
  return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${register[field]}`}>{register[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <Form onSubmit={(event) => onRegisterUpdated(event, newRegister)}>
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
            errors={errors}/>

        <EditSaveCancelButtons editMode={editMode} onSetEditMode={setEditMode} onDelete={(event) => onRegisterDeleted(event, newRegister.id)}/>
    </Form>
    </div>
    </td></tr>))}   
</> 
)
}

export default Register;