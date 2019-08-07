
const lStore = {

    name: '_app-lStore',
    stores: false,

    hasStore: (name) => {
        if (!lStore.stores) {
            lStore.stores = JSON.parse(localStorage.getItem(lStore.name+'.stores'))
            if (!lStore.stores) {
                localStorage.setItem(lStore.name + '.stores', JSON.stringify([]))
                lStore.stores = []
            }
        }
        return lStore.stores.includes(name)
    },

    createStore: (name) => {
        localStorage.setItem(lStore.name + '.store.' + name, JSON.stringify({}))
        lStore.stores.push(name)
        localStorage.setItem(lStore.name + '.stores', JSON.stringify(lStore.stores))
    },

    get: (sName) => {
        if (!lStore.hasStore(sName)) lStore.createStore(sName)
        return JSON.parse(localStorage.getItem(lStore.name + '.store.' + sName))
    },

    set: (sName, data) => {
        if (!lStore.hasStore(sName)) lStore.createStore(sName)
        localStorage.setItem(lStore.name + '.store.' + sName, JSON.stringify(data));
    },

    clear: () => {
        lStore.stores = false
        localStorage.clear()
    }

}

export default lStore