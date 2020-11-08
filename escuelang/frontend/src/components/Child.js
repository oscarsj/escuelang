import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child}) => {
    const [rolledOut, setRolledOut] = useState(false);
    
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
<td>
    {child.name}
</td>
<td>
    {child.surname}
</td>
<td>
    {child.birthdate}
</td>
<td>
    {child.address}
</td>
</tr>
{(rolledOut && (<tr>
    <td colSpan="12"><ChildDetails child={child}/></td></tr>))}   
</>
)
    }

export default Child;
