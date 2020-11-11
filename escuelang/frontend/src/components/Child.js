import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child, visibleFields, fieldTranslations, onChildUpdated}) => {
    const [rolledOut, setRolledOut] = useState(false);
    const handleChildUpdated = (child) => {
        //setRolledOut(false);
        onChildUpdated(child);
    }
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td key={child[field]}>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td colSpan="12">
        <ChildDetails 
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
