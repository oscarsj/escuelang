import React, { useState } from 'react';
import store from '../store';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';
import EditableRegister from './EditableRegister';

const Register = ({register, visibleFields}) => {
  const [rolledOut, setRolledOut] = useState(false);
  const storeReplaceRegister = store.useRegistersStore(state => state.replaceRegister)
  const storeDeleteRegister = store.useRegistersStore(state => state.deleteRegister);
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});

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
  const onRegisterSaved = (newRegister) => {
    childrenApi
      .update(newRegister.child.id, newRegister.child)
      .then((resultChild) => {
        const tmpRegister = {
            ...newRegister,
            child: resultChild.id};
        seasonsApi
        .updateRegister(tmpRegister.id, tmpRegister)
        .then((resultRegister) => {
            setRolledOut(false);
            const tmpRegister = {
              ...resultRegister,
              child: resultChild}
            storeReplaceRegister(tmpRegister);
          })
        .catch(handleError)
    })
  }

  const onRegisterDeleted = (newRegister) => {
      console.log("deleting register ", newRegister.id);
      seasonsApi
        .deleteRegister(newRegister.id)
        .then(() => {
          console.log("Register page deleted register ", newRegister.id);
          setRolledOut(false);
          storeDeleteRegister(newRegister.id);
        })
        .catch(handleError)
  }
  return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td${register.child[field]}`}>{register.child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${register[field]}`}>{field=='competition'? (register[field]? 'Sí':'No'):register[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${register.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <EditableRegister 
      register={register}
      onRegisterUpdated={onRegisterSaved}
      onRegisterDeleted={onRegisterDeleted}
      error={error}
      errors={errors}/>
    </div>
    </td></tr>))}   
</> 
)
}

export default Register;