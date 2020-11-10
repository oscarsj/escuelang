import React, {useState} from 'react';
import ChildDetails from './ChildDetails';
import InputChild from './InputChild';

const Child = ({child, visibleFields, translations}) => {
    const [rolledOut, setRolledOut] = useState(false);
    
    return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.map((field) => <td>{child[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td colSpan="12"><InputChild fieldTranslations={translations} child={child} readOnly={true}/></td></tr>))}   
</>
)
    }

export default Child;
