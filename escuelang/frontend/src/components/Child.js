import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child, visibleFields, translations, onChildUpdated}) => {
    const [rolledOut, setRolledOut] = useState(false);
    
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td key={child[field]}>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td colSpan="12">
        <ChildDetails 
          child={child} 
          fieldTranslations={translations} 
          readOnly={true}
          onChildUpdated={onChildUpdated}
          />
    </td></tr>))}   
</> 
)
    }

export default Child;
