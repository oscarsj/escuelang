import React from 'react';

const InputChild = ({child, onChange}) => {

    return (
      <>
        <input id='name' value={child.name} onChange={onChange('name')}/>
        <input id='surname' value={child.surname} onChange={onChange('surname')}/>
        <input id='address' value={child.address} onChange={onChange('address')}/>
        <input id='postcode' value={child.postcode} onChange={onChange('postcode')}/>
        <input id='dni' value={child.dni} onChange={onChange('dni')}/>
        <button id='new' type="submit">Guardar</button>
      </>
          )
    }

export default InputChild;