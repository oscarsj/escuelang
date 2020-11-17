import React, { useState, useEffect } from 'react';
import ChildrenList from './ChildrenList';
import SeasonData from './SeasonData';
import AddChildForm from './AddChildForm';
import seasons from '../client/seasons';


const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [children, setChildren] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});
    const onNewChild = (child) => {
      seasons
        .registerChild(season.id, registerChild)
      setChildren(setChildren(children.concat(child)));
    }
    const seasonFieldsTranslation = {
      name: "Nombre",
      course: "Curso",
      start_date: "Fecha de inicio",
      end_date: "Fecha de fin",
      default_price: "Precio base",
      active: "Temporada actual"
    }
    const onChildUpdated = (newChild) => {
      console.log("Replacing child: ", newChild);
      const updatedChildIndex = children.findIndex(child => child.id == newChild.id);
      const tmpChildren = [...children];
      tmpChildren[updatedChildIndex] = newChild;
      setChildren(tmpChildren);
    }
    const onSeasonUpdated = (newSeason) => {
      console.log("New season data: ", newSeason);
      const seasonData = Object.assign(newSeason, season);
      seasons
        .update(seasonId, seasonData)
        .then((result) => {
          setSeason(result)
        })
        .catch((err) => {
          console.log("Error updating season: ", err.response);
        })
    }

    useEffect(() => {
      seasons
          .get(seasonId)
          .then(newSeason => {
              console.log("Season loaded: ", newSeason);
              setSeason(newSeason);
              setSeasonId(newSeason.id);
            }
          );  
      seasons
          .getChildren(seasonId)
          .then(children => 
            setChildren(children)
          );
        
    }, []);

    return (
    <>
    <SeasonData 
      season={season}
      fieldTranslations={seasonFieldsTranslation}
      onSeasonUpdated={onSeasonUpdated}/>
    <AddChildForm 
      onNewChild={onNewChild}
      fieldTranslations={fieldTranslations} 
    />
    <ChildrenList 
      fieldTranslations={fieldTranslations} 
      children={children}
      onChildUpdated={onChildUpdated}/>
    </>
    )
}

export default SeasonPage;