import React from 'react';

const InputChild = ({child, onChange}) => {
    const handleChange = (field) =>
      (event) => {
          let child = {...child};
          child[field] = event.target.value;
          onChange(child);
      }

    return (
      <>
        <input id='name' value={child.name} onChange={handleChange('name')}/>
        <input id='surname' value={child.surname} onChange={handleChange('surname')}/>
        <input id='address' value={child.address} onChange={handleChange('address')}/>
        <input id='postcode' value={child.postcode} onChange={handleChange('postcode')}/>
        <input id='dni' value={child.dni} onChange={handleChange('dni')}/>
        <button id='new' type="submit">Guardar</button>
      </>
          )
    }

export default InputChild;
