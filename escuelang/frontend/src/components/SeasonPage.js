import React, { useEffect } from 'react';
import RegisterList from './RegisterList';
import SeasonData from './SeasonData';
import AddRegisterForm from './AddRegisterForm';
import store from '../store';
import seasonsApi from '../client/seasons';
import daysApi from '../client/days';
import monitorsApi from '../client/monitors';

const SeasonPage = () => {    
    const seasonId = store.useSeasonStore(state => state.seasonId);
    const storeSetSeason = store.useSeasonStore(state => state.setSeason);
    
    const storeSetRegisters = store.useRegistersStore(state => state.setRegisters);
    const storeSetMonitors = store.useMonitorStore(state => state.setMonitors);
    const storeSetDays = store.useDaysStore(state => state.setDays);

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
    <AddRegisterForm seasonId={seasonId}/>
    <RegisterList />
    </>
    )
}

export default SeasonPage;