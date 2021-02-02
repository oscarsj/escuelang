import React, { useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import {
  useSeasonStore, 
  useRegistersStore,
  useMonitorStore,
  useDaysStore } from '../store';
import client from '../client';


const SeasonPage = () => {    
    const seasonId = useSeasonStore(state => state.seasonId);
    const season = useSeasonStore(state => state.season);
    const storeSetSeason = useSeasonStore(state => state.setSeason);    
    const storeSetRegisters = useRegistersStore(state => state.setRegisters);
    const storeSetMonitors = useMonitorStore(state => state.setMonitors);
    const storeSetDays = useDaysStore(state => state.setDays);
    const addRegister = useRegistersStore(state => state.addRegister);

    useEffect(() => {
      console.log("Fetching data from server - season: ", seasonId);
      client.loadSeason(seasonId).then(storeSetSeason);
      client.loadDays().then(storeSetDays);
      client.loadMonitors().then(storeSetMonitors);
      client.loadRegisters(seasonId).then(storeSetRegisters);
    }, []);

    const handleError = (onFailure) => {
      return (err) => {
        if (err.response) {
            console.log('Error in update child: ', err.response);
            if(err.response.data.child != undefined) {
              if(err.response.data.child[0] == "This field must be unique.")
                onFailure("¡El alumno ya está registrado en esta temporada!", err.response.data);
              else
                onFailure("Error en los datos del alumno");
            } else {
              const nonFieldErrors = err.response.data.non_field_errors;
              onFailure(nonFieldErrors || "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos", err.response.data);
            }
        } else if (err.request) {
            // client never received a response, or request never left
            onFailure("Error con el servidor :( Reintente más tarde");
        } else {
            // anything else
            onFailure("Error desconocido :( Reintente más tarde");
        }
      }
    }

  const onRegisterAdded = (newRegister, onSuccess, onFailure) => {
    console.log("Posting new register", newRegister);
    client.addRegisterAndUpdateOrCreateChild(newRegister)
      .then(register => {
            onSuccess();  
            addRegister({
                ...register,
                child: child
              });
          })
      .catch(handleError(onFailure))
  }
  
  const onSeasonUpdated = (newSeason, onSuccess, onFailure) => {
    client
    .updateSeason(newSeason)
    .then((result) => {
      storeSetSeason(result);
      onSuccess();
    })
    .catch((err) => {
      onFailure(err);
    })
  }
  return (<>
    <SeasonData 
      season={season}
      onSeasonUpdated={onSeasonUpdated}/>
    <AddRegisterForm onRegisterAdded={onRegisterAdded}/>
    <RegisterList />
    </>
    )
}

export default SeasonPage;