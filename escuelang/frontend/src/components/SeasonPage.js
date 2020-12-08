import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import seasons from '../client/seasons';


const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [registers, setRegisters] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});

    const onRegisterUpdated = (newRegister) => {
      console.log("Replacing register: ", newRegister);
      const updatedRegisterIndex = registers.findIndex(register => register.id == register.id);
      const tmpRegisters = [...registers];
      tmpRegisters[updatedRegisterIndex] = newRegister;
      setRegisters(tmpRegisters);
    }
    const onNewRegister = (register) => {
      console.log("new register received ", register);
      setRegisters(registers.concat(register));
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
      fieldTranslations={fieldTranslations.season}
      onSeasonUpdated={onSeasonUpdated}/>
    <AddRegisterForm 
      seasonId={seasonId}
      onNewRegister={onNewRegister}
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