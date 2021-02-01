import create from 'zustand';


const useSettingsStore = create(set => ({
    language: 'en_US',
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
        set((state) =>
            {return {registers: state.registers.filter(
                (register) => register.id != registerId)}}),
    addRegister: (register) => set((state) => { 
        const tmpRegisters = [...state.registers];
        tmpRegisters.push(register);
        return {registers: tmpRegisters};
        }),
    })
)

const useMonitorStore = create(set => ({
    monitors: [],
    defaultMonitor: "",
    setMonitors: (newMonitors) => set({
        monitors: newMonitors,
        defaultMonitor: newMonitors[0].nick})
}))

const useDaysStore = create(set => ({
    days: [],
    setDays: (newDays) => set({days: newDays})
}))

const useSeasonStore = create(set => ({
    season: {},
    seasonId: "active",
    setSeason: (newSeason) => set({
        season: newSeason,
        seasonId: newSeason.id})
}))

const useOldChildrenStore = create(set => ({
    children: [],
    setChildren: (children) => set({children: children}),
    replaceChild: (newChild) => set((state) => {
        const updatedChildIndex = state.children.findIndex(child => child.id == newChild.id);
        const children = [...state.children];
        children[updatedChildIndex] = newChild;
        return {children: children}
    }),
    deleteChild: (childId) => 
        set((state) =>
            {return {children: state.children.filter(
                (child) => child.id != childId)}}),
}))

export {
    useRegistersStore,
    useMonitorStore,
    useDaysStore,
    useSeasonStore,
    useSettingsStore,
    useOldChildrenStore
};