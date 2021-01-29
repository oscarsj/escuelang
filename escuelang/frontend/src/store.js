import create from 'zustand';


const useSettingsStore = create(set => ({
    language: 'es_ES',
    setLanguage: (lang) => set({language: lang})
}))

const useRegistersStore = create(set => ({
    season: {},
    registers: [],
    setRegisters: (newRegisters) => set({registers: newRegisters}),
    replaceRegister: (newRegister) => 
        set((state) => {
            const updatedRegisterIndex = state.registers.findIndex(register => register.id == newRegister.id);
            const tmpRegisters = [...state.registers];
            tmpRegisters[updatedRegisterIndex] = newRegister;
            return {registers: tmpRegisters};
        }),
    deleteRegister: (registerId) => 
        set((state) => state.registers.filter((register) => register.id != registerId)),
    addRegister: (register) => set((state) => { 
        const tmpRegisters = [...state.registers];
        tmpRegisters.push(register);
        return {registers: tmpRegisters};
        }),
    })
)

const useMonitorStore = create(set => ({
    monitors: {},
    setMonitors: (newMonitors) => set({monitors: newMonitors})
}))

const useDaysStore = create(set => ({
    days: {},
    setDays: (newDays) => set({days: newDays})
}))

const useSeasonStore = create(set => ({
    season: {},
    seasonId: "active",
    setSeason: (newSeason) => set({
        season: newSeason,
        seasonId: newSeason.id}),
}))

export default {
    useRegistersStore,
    useMonitorStore,
    useDaysStore,
    useSeasonStore,
    useSettingsStore
};