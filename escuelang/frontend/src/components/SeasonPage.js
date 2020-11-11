import React, { useState } from 'react';
import ChildrenList from './ChildrenList';
import SeasonData from './SeasonData';
import { useEffect } from 'react';
import seasons from '../client/seasons';
import childrenApi from '../client/children';
import AddChildForm from './AddChildForm';



const SeasonPage = ({defaultSeason="active", setError, setMessage, fieldTranslations}) => {
    const [newChild, setNewChild] = useState(fieldTranslations);
    const [children, setChildren] = useState("");
    const [season, setSeason] = useState(defaultSeason);
    const postNewChild = (event) => {
        // Simple POST request with a JSON body using fetch
        console.log("Posting new child", newChild);
        event.preventDefault();
        childrenApi
          .create(newChild)
          .then(child => {
            setNewChild(fieldTranslations);
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
    const onChildUpdated = (event) => {
        const child = event.target.value
        childrenApi
          .update(child.id, child)
          .then((result) => {
              setMessage("Alumno actualizado");
              setChild(result);
          })
    }

    useEffect(() => {
        seasons
          .getChildren(season)
          .then(
              children => setChildren(children)
          )
        seasons
          .get(season)
          .then(
              season => setSeason(season)
          )
    }, []);

    return (
    <>
    <SeasonData season={season}/>
    <AddChildForm 
      fieldTranslations={fieldTranslations} 
      child={newChild} 
      onChange={setNewChild} 
      onSubmit={postNewChild}
    />
    <ChildrenList 
      fieldTranslations={fieldTranslations} 
      children={children}
      onChildUpdated={onChildUpdated}/>
    </>
    )
}

export default SeasonPage;