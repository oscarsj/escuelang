import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import seasons from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';


const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [registers, setRegisters] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});
    const [allMonitors, setAllMonitors] = useState([]);
    const [allDays, setAllDays] = useState([]);
  
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
      daysApi
        .get()
        .then(days => {
          setAllDays(days);
        });
      console.log("allDays: ", allDays);
      monitorsApi
        .get()
        .then(monitors => {
          setAllMonitors(monitors);
        });
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
      allDays={allDays}
      allMonitors={allMonitors}
    />
    <RegisterList 
      fieldTranslations={fieldTranslations} 
      registers={registers}
      onRegisterUpdated={onRegisterUpdated}
      allDays={allDays}
      allMonitors={allMonitors}/>
    </>
    )
}

export default SeasonPage;