import React, {useState} from 'react';
import ChildDetails from './ChildDetails';

const Register = ({register, visibleFields, fieldTranslations, onRegisterUpdated}) => {
  const [rolledOut, setRolledOut] = useState(false);
  const child = register.child;
  const handleRegisterUpdated = (child) => {
      //setRolledOut(false);
      console.log("Update on Child: ", child)
      onChildUpdated(child);
  }
  console.log("Register rendered: ", register);
  console.log("visible fields: ", visibleFields);
  return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${register[field]}`}>{register[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
        <ChildDetails 
          key={child.id}
          child={child} 
          fieldTranslations={fieldTranslations} 
          readOnly={true}
          onChildUpdated={handleRegisterUpdated}
          />
    </td></tr>))}   
</> 
)
}

export default Register;