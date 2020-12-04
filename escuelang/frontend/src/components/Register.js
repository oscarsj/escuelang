import React from 'react';
import Child from "./Child";

const Register = ({register, fieldTranslations, visibleFields, onChildUpdated}) => {
    console.log("Register ",  register);

    return (
              <Child 
                child={register.child}
                visibleFields={visibleFields.child}
                fieldTranslations={fieldTranslations.child}
                onChildUpdated={onChildUpdated}/>
          )
    }
export default Register;