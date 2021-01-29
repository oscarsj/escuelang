import React, { useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import trans from '../translations';
import store from '../store';
import seasonsApi from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';

const SeasonPage = ({fieldTranslations}) => {    
    const seasonId = store.useSeasonStore(state => state.seasonId);
    const storeSetSeason = store.useSeasonStore(state => state.setSeason);
    
    const registers = store.useRegistersStore(state => state.registers);
    const storeSetRegisters = store.useRegistersStore(state => state.setRegisters);
    const storeReplaceRegister = store.useRegistersStore(state => state.replaceRegister)
    const allMonitors = store.useMonitorStore(state => state.monitors);
    const storeSetMonitors = store.useMonitorStore(state => state.setMonitors);

    const allDays = store.useDaysStore(state => state.days);  
    const storeSetDays = store.useDaysStore(state => state.setDays);

    const onRegisterUpdated = (event, newRegister) => {
      event.stopPropagation();
      event.preventDefault();
      childrenApi
        .update(newRegister.child.id, newRegister.child)
        .then((result) => {
          console.log("update child on RegisterDetails: ", result)
          const tmpRegister = {
              ...newRegister,
              child: result.id};
          seasonsApi
          .updateRegister(tmpRegister.id, tmpRegister)
          .then((result) => {
              console.log("update on RegisterDetails: ", result)
              storeReplaceRegister(result);
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
      storeSetRegisters(registers.concat(register));
    }
    
    const loadRegisters = (seasonId) => {
      seasonsApi
        .getRegisters(seasonId)
        .then(registers => 
          storeSetRegisters(registers)
        );
    }
    const loadSeason = (id) => {
      seasonsApi
        .get(id)
        .then(newSeason => {
            console.log("Season loaded: ", newSeason);
            storeSetSeason(newSeason);
          }
        );
    }
    
  const loadDays = () => {
    daysApi
        .get()
        .then(days => {
          storeSetDays(days);
        });
  }

  const loadMonitors = () => {
    monitorsApi
        .get()
        .then(monitors => {
          storeSetMonitors(monitors);
        });
    }

    useEffect(() => {
      console.log("Getting registers for season ", seasonId);
      loadSeason(seasonId);
      loadDays();
      loadMonitors();
      loadRegisters(seasonId);
    }, []);

    return (
    <>
    <SeasonData />
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