import React from 'react';

const Child = ({child}) => {
    return (
        <tr key={child.id}>
            <td>{child.name}</td>
            <td>{child.surname}</td>
            <td>{child.birthdate}</td>
        </tr>
          )
    }

export default Child;
