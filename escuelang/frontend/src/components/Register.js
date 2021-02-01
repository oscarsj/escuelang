import React, { useState } from 'react';
import {useRegistersStore} from '../store';
import childrenApi from '../client/children';
import seasonsApi from '../client/seasons';
import EditableRegister from './EditableRegister';

const Register = ({register, visibleFields}) => {
  const [rolledOut, setRolledOut] = useState(false);
  const storeReplaceRegister = useRegistersStore(state => state.replaceRegister)
  const storeDeleteRegister = useRegistersStore(state => state.deleteRegister);

  const handleError = (onFailure) =>
   (err) => {
    if (err.response) {
        console.log('Error in update register', err.response);
        onFailure("Ha habido errores al guardar. Revise los valores introducidos", err.response.data);
    } else if (err.request) {
        // client never received a response, or request never left
    } else {
        // anything else
    }
  }
  const onRegisterSaved = (newRegister, onSuccess, onFailure) => {
    childrenApi
      .update(newRegister.child.id, newRegister.child)
      .then((resultChild) => {
        const tmpRegister = {
            ...newRegister,
            child: resultChild.id};
        seasonsApi
        .updateRegister(tmpRegister.id, tmpRegister)
        .then((resultRegister) => {
            storeReplaceRegister({
              ...resultRegister,
              child: resultChild});
              onSuccess();

          })
        .catch(handleError(onFailure))
    })
    .catch(handleError(onFailure))
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
        .catch(handleError(()=>{}))
  }
  return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td$-${field}-${register.child[field]}`}>{register.child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${register[field]}`}>{field=='competition'? (register[field]? 'Sí':'No'):register[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${register.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <EditableRegister 
      register={register}
      onRegisterUpdated={onRegisterSaved}
      onRegisterDeleted={onRegisterDeleted}
    />
    </div>
    </td></tr>))}   
</> 
)
}

export default Register;