import React from 'react';
import Child from "./Child";

const Register = ({register}) => {
    console.log("Register ",  register);
    return (
            <tr key={register.id}>
              <Child child={register.child}/>
            </tr>
          )
    }
export default Register;