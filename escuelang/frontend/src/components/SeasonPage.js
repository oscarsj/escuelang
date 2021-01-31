import React, { useState, useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import store from '../store';
import seasonsApi from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';
import childrenApi from '../client/children';


const SeasonPage = () => {    
    const seasonId = store.useSeasonStore(state => state.seasonId);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    const storeSetSeason = store.useSeasonStore(state => state.setSeason);    
    const storeSetRegisters = store.useRegistersStore(state => state.setRegisters);
    const storeSetMonitors = store.useMonitorStore(state => state.setMonitors);
    const storeSetDays = store.useDaysStore(state => state.setDays);
    const addRegister = store.useRegistersStore(state => state.addRegister);

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

    const handleError = (err) => {
      if (err.response) {
          console.log('Error in update child: ', err.response);
          const nonFieldErrors = err.response.data.non_field_errors;
          setError(nonFieldErrors || "Ha habido errores al añadir el nuevo alumno. Revise los valores introducidos");
          setErrors(err.response.data);
      } else if (err.request) {
          // client never received a response, or request never left
      } else {
          // anything else
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

    const onRegisterAdded = (newRegister) => {
      // Simple POST request with a JSON body using fetch
    console.log("Posting new register", newRegister);
    const childPromise = newRegister.child.id == undefined? postNewChild(newRegister.child): updateChild(newRegister.child);
    childPromise.then(child => {
        seasonsApi
          .registerChild(seasonId, {
              ...newRegister,
              child: child.id
          })
          .then(register => {
              console.log('Register created!');
              const tmpRegister = {
                ...register,
                child: child
              }
              setError("");
              setErrors({});
              addRegister(tmpRegister);
          })
          .catch(handleError)
    })
    .catch(handleError)
  }
  
  const onAddCanceled = () => {
    setError("");
    setErrors({});
  }
  return (<>
    <SeasonData />
    <AddRegisterForm 
      onRegisterAdded={onRegisterAdded}
      onCanceled={onAddCanceled}
      error={error}
      errors={errors}/>
    <RegisterList />
    </>
    )
}

export default SeasonPage;