import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child, visibleFields, fieldTranslations, onChildUpdated, onChildDeleted}) => {
    const [rolledOut, setRolledOut] = useState(false);

    const rollAndForward = (originalHandler) => 
    (...params) => {
        setRolledOut(false);
        originalHandler(...params);
    }
    
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
        <ChildDetails 
          key={child.id}
          child={child} 
          fieldTranslations={fieldTranslations} 
          readOnly={true}
          onChildUpdated={rollAndForward(onChildUpdated)}
          onChildDeleted={rollAndForward(onChildDeleted)}
          />
    </td></tr>))}   
</> 
)
    }

export default Child;
