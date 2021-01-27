import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import seasonsApi from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';
import trans from '../translations';

const SeasonPage = ({defaultSeason="active", fieldTranslations}) => {
    const [registers, setRegisters] = useState("");
    const [seasonId, setSeasonId] = useState(defaultSeason);
    const [season, setSeason] = useState({});
    const [allMonitors, setAllMonitors] = useState([]);
    const [allDays, setAllDays] = useState([]);
  
    const onRegisterUpdated = (event, newRegister) => {
      event.stopPropagation();
      event.preventDefault();
      childrenApi
          .update(newRegister.child.id, newRegister.child)
          .then((result) => {
            console.log("update child on RegisterDetails: ", result)
            const tmpRegister = {
                ...newRegister,
                child: newRegister.child.id};
            seasonsApi
            .updateRegister(newRegister.id, tmpRegister)
            .then((result) => {
                setEditMode(false);
                setErrors({});
                setError("");
                console.log("update on RegisterDetails: ", result)
                const updatedRegisterIndex = registers.findIndex(register => register.id == register.id);
                const tmpRegisters = [...registers];
                tmpRegisters[updatedRegisterIndex] = newRegister;
                setRegisters(tmpRegisters);
              })
            .catch(err => {
                if (err.response) {
                    console.log('Error in update register', err.response);
                    setError("Ha habido errores al guardar. Revise los valores introducidos");
                    setErrors(err.response.data);
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })
        })
    }
    const onRegisterDeleted = (event, registerId) => {
      event.stopPropagation();
      event.preventDefault();
      if (window.confirm(trans.seasonTranslations.confirmDeleteRegister)) {
        seasonsApi
          .deleteRegister(registerId)
          .then((result) => {
            console.log("Season page deleted register ", registerId);
            setRegisters(registers.filter((register) => register.id != registerId));
          })
          .catch()
      }
    }

    const onNewRegister = (register) => {
      console.log("new register received ", register);
      setRegisters(registers.concat(register));
    }
    const onSeasonUpdated = (newSeason) => {
      console.log("New season data: ", newSeason);
      const seasonData = Object.assign(newSeason, season);
      seasonsApi
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
      seasonsApi
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
        seasonsApi
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
      onRegisterDeleted={onRegisterDeleted}
      allDays={allDays}
      allMonitors={allMonitors}/>
    </>
    )
}

export default SeasonPage;