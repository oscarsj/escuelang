import React, {useState} from 'react';
import RegisterDetails from './RegisterDetails';

const Register = ({register, visibleFields, fieldTranslations, onRegisterUpdated, onRegisterDeleted, allDays, allMonitors}) => {
  const [rolledOut, setRolledOut] = useState(false);
  const child = register.child;
  console.log("Register rendered: ", register);
  console.log("visible fields: ", visibleFields);
  const rollAndForward = (originalHandler) =>
   (...params) => {
    setRolledOut(false);
    return originalHandler(...params);
  } 
  return (<>
<tr onClick={() => setRolledOut(!rolledOut)}>
{visibleFields.child.map((field) => <td key={`td${child[field]}`}>{child[field]}</td>)}
{visibleFields.register.map((field) => <td key={`td${register[field]}`}>{register[field]}</td>)}
</tr>
{(rolledOut && (<tr>
    <td key={`tdUnrolled${child.id}`} colSpan="12">
        <RegisterDetails 
          key={register.id}
          register={register} 
          fieldTranslations={fieldTranslations} 
          readOnly={true}
          onRegisterUpdated={rollAndForward(onRegisterUpdated)}
          onRegisterDeleted={rollAndForward(onRegisterDeleted)}
          allDays={allDays}
          allMonitors={allMonitors}
          />
    </td></tr>))}   
</> 
)
}

export default Register;