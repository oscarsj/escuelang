import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child, visibleFields, fieldTranslations, onChildUpdated}) => {
    const [rolledOut, setRolledOut] = useState(false);
    const handleChildUpdated = (child) => {
        //setRolledOut(false);
        console.log("Update on Child: ", child)
        onChildUpdated(child);
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
          onChildUpdated={handleChildUpdated}
          />
    </td></tr>))}   
</> 
)
    }

export default Child;
