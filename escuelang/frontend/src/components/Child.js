import React, { useState } from 'react';
import store from "../store";
import childrenApi from '../client/children';
import EditableChild from './EditableChild';


const Child = ({child, visibleFields}) => {
    const [rolledOut, setRolledOut] = useState(false);
    
    const replaceChild = store.useOldChildrenStore((state) => state.replaceChild)
    const deleteChild = store.useOldChildrenStore((state) => state.deleteChild)
    
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

    const onChildSaved = (newChild) => {
        console.log(`child updated: ${newChild.name} ${newChild.surname}`);
        childrenApi
          .update(newChild.id, newChild)
          .then((result) => {
              setErrors({});
              setError("");
              setRolledOut(false);
              replaceChild(result);
          })
          .catch(errorHandler)
    }

    const onChildDeleted = (newChild) => {
        childrenApi
            .deleteChild(newChild.id)
            .then(() => {
                deleteChild(newChild.id)
                console.log("OldChildren page deleted child ", childId);
                setErrors({});
                setError("");
                setRolledOut(false);
            })
            .catch(errorHandler)
    }
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
    <div className="border border-primary rounded mb-0" style={{ padding: "10px", marginTop: "10px", marginBottom: "10px"}}>
    <EditableChild 
      child={child}
      onChildUpdated={onChildSaved}
      onChildDeleted={onChildDeleted}
      error={error}
      errors={errors} />
    </div>
    </td></tr>))}   
</> 
)
    }

export default Child;
