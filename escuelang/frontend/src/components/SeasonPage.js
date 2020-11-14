import React, { useState } from 'react';
import ChildrenList from './ChildrenList';
import SeasonData from './SeasonData';
import { useEffect } from 'react';
import seasons from '../client/seasons';
import AddChildForm from './AddChildForm';



const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [children, setChildren] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});
    const onNewChild = (child) => {
      seasons
        .registerChild(season.id, registerChild)
      setChildren(setChildren(children.concat(child)));
    }

    const onChildUpdated = (newChild) => {
      console.log("Result of update: newChild");
      const updatedChildIndex = children.findIndex(child => child.id == newChild.id);
      const tmpChildren = [...children];
      tmpChildren[updatedChildIndex] = newChild;
      setChildren(tmpChildren);
    }

    useEffect(() => {
        seasons
          .getChildren(seasonId)
          .then(children => 
            setChildren(children)
          )
        seasons
          .get(seasonId)
          .then(newSeason => {
               setSeason(newSeason);
               setSeasonId(newSeason.id);
              }
          )
    }, []);

    return (
    <>
    <SeasonData season={season}/>
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