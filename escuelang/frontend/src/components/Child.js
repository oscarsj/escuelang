import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Child = ({child}) => {
    const [rolledOut, setRolledOut] = useState(false);
    const handleOnClick = (id) => {
        return (event) => {
            console.log(event.target);
            console.log(id);
            setRolledOut(!rolledOut);
        }
    }
    
    return (<>
<tr onClick={handleOnClick(child.id)}>
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
