import seasonsApi from './client/seasons';
import daysApi from './client/days';
import monitorsApi from './client/monitors';
import childrenApi from './client/children';


const loadRegisters = (seasonId) => {
    return seasonsApi
      .getRegisters(seasonId)
      .then(registers => registers);
}
const loadSeason = (seasonId) => {
    return seasonsApi
      .get(seasonId)
      .then(newSeason => newSeason);
}

const updateSeason = (season) => {
  return seasonsApi
    .update(season.id, season)
    .then((result) => result)
}
const loadDays = () => {
    return daysApi
        .get()
        .then(days => days);
}

const loadMonitors = () => {
   return monitorsApi
    .get()
    .then(monitors => monitors);
}

const updateChild = (newChild) => {
    return childrenApi
      .update(newChild.id, newChild)
      .then(child => {
        console.log('Child updated!');
        return child;
      })
  }
  const postNewChild = (newChild) => {
    return childrenApi
        .create(newChild)
        .then(child => {
          return child;
        })
  }


const addRegisterAndUpdateOrCreateChild = (newRegister) => {
    const childPromise = newRegister.child.id == undefined? postNewChild(newRegister.child): updateChild(newRegister.child);
    return childPromise
      .then(child => {
        seasonsApi
          .registerChild(seasonId, {
              ...newRegister,
              child: child.id
          })
          .then(register => {
            return {
                ...register,
                child: child
              };
          })          
      })
}

export default { 
    loadRegisters, 
    loadSeason, 
    updateSeason,
    loadDays, 
    loadMonitors,
    addRegisterAndUpdateOrCreateChild };