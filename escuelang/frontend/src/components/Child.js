import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child, visibleFields}) => {
    const [rolledOut, setRolledOut] = useState(false);
    
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td colSpan="12"><ChildDetails child={child}/></td></tr>))}   
</>
)
    }

export default Child;
