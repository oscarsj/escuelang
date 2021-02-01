import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import {
  useSeasonStore, 
  useRegistersStore,
  useMonitorStore,
  useDaysStore } from '../store';
import seasonsApi from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';
import childrenApi from '../client/children';


const SeasonPage = () => {    
    const seasonId = useSeasonStore(state => state.seasonId);
    
    const storeSetSeason =useSeasonStore(state => state.setSeason);    
    const storeSetRegisters = useRegistersStore(state => state.setRegisters);
    const storeSetMonitors = useMonitorStore(state => state.setMonitors);
    const storeSetDays = useDaysStore(state => state.setDays);
    const addRegister = useRegistersStore(state => state.addRegister);

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

    const updateChild = (newChild) => {
      console.log("Updating child", newChild);
      return childrenApi
        .update(newChild.id, newChild)
        .then(child => {
          console.log('Child updated!');
          return child;
        })
    }
    const postNewChild = (newChild) => {
      console.log("Posting new child", newChild);
      return childrenApi
          .create(newChild)
          .then(child => {
            console.log('Child created!');
            return child;
          })
    }

    const onRegisterAdded = (newRegister, onSuccess, onFailure) => {
      // Simple POST request with a JSON body using fetch
    console.log("Posting new register", newRegister);
    const childPromise = newRegister.child.id == undefined? postNewChild(newRegister.child): updateChild(newRegister.child);
    childPromise
      .then(child => {
        seasonsApi
          .registerChild(seasonId, {
              ...newRegister,
              child: child.id
          })
          .then(register => {
            onSuccess();  
            addRegister({
                ...register,
                child: child
              });
          })
          .catch(handleError(onFailure))
      })
      .catch(handleError(onFailure))
  }
  
  return (<>
    <SeasonData />
    <AddRegisterForm 
      onRegisterAdded={onRegisterAdded} />
    <RegisterList />
    </>
    )
}

export default SeasonPage;