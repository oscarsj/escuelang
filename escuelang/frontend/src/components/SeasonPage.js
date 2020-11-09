import React, { useState } from 'react';
import InputChild from './InputChild';
import ChildrenList from './ChildrenList';
import SeasonData from './SeasonData';
import { useEffect } from 'react';
import seasons from '../client/seasons';
import childrenApi from '../client/children';


const SeasonPage = ({defaultSeason="active", setError, setMessage, fieldTranslations}) => {
    const [newChild, setNewChild] = useState(fieldTranslations)
    const [children, setChildren] = useState("");
    const [season, setSeason] = useState(defaultSeason);
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
    <InputChild fieldTranslations={fieldTranslations} child={newChild} onChange={setNewChild} onSubmit={postNewChild}/>
    <ChildrenList fieldTranslations={fieldTranslations} children={children}/>
    </>
    )
}

export default SeasonPage;