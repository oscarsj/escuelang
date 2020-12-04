import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddChildForm from './AddChildForm';
import seasons from '../client/seasons';


const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [registers, setRegisters] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});
    const onNewRegister = (register) => {
      seasons
        .registerChild(season.id, register)
      setRegisters(children.concat(register));
    }
    const seasonFieldsTranslation = {
      name: "Nombre",
      course: "Curso",
      start_date: "Fecha de inicio",
      end_date: "Fecha de fin",
      default_price: "Precio base",
      active: "Temporada actual"
    }
    const onRegisterUpdated = (newRegister) => {
      console.log("Replacing register: ", newRegister);
      const updatedRegisterIndex = registers.findIndex(register => register.id == register.id);
      const tmpRegisters = [...registers];
      tmpRegisters[updatedRegisterIndex] = newRegister;
      setRegisters(tmpRegisters);
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
      console.log("Getting registers for season ", seasonId);
      seasons
          .get(seasonId)
          .then(newSeason => {
              console.log("Season loaded: ", newSeason);
              setSeason(newSeason);
              setSeasonId(newSeason.id);
            }
          );  
      seasons
          .getRegisters(seasonId)
          .then(registers => 
            setRegisters(registers)
          );
        
    }, []);

    return (
    <>
    <SeasonData 
      season={season}
      fieldTranslations={seasonFieldsTranslation}
      onSeasonUpdated={onSeasonUpdated}/>
    <AddChildForm 
      onNewChild={onNewRegister}
      fieldTranslations={fieldTranslations} 
    />
    <RegisterList 
      fieldTranslations={fieldTranslations} 
      registers={registers}
      onRegisterUpdated={onRegisterUpdated}/>
    </>
    )
}

export default SeasonPage;