import React, { useState } from 'react';
import InputChild from './InputChild';
import ChildrenList from './ChildrenList';
import { useEffect } from 'react';
import seasons from '../client/seasons';


const SeasonPage = ({setError, setMessage}) => {
    const [newChild, setNewChild] = useState({
        name: 'Nombre',
        surname: 'Apellido',
        address: 'Direccion',
        postcode: 'Código Postal',
        dni: 'DNI'
      })
    const [children, setChildren] = useState("");

    const postNewChild = (event) => {
        // Simple POST request with a JSON body using fetch
        event.preventDefault();
        childrenApi
          .create(newChild)
          .then(child => {
            setNewChild(child);
            setChildren(children.concat(child))
            setMessage("Alumno añadido!");
            setError("");
          })
          .catch(err => {
            if (err.response) {
                console.log('Error in create child', err);
                setMessage("");
                setError("Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
                setNewChild(err.response.data);
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })
    }
    useEffect(() => {
        seasons
          .getActiveChildren()
          .then(
              children => setChildren(children)
          )
    }, []);

    return (
    <>
    <div className="h1 center-block">Temporada actual</div>
    <InputChild child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
    <ChildrenList children={children}/>
    </>
    )
}

export default SeasonPage;