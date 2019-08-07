
const lStore = {

    stores: false,

    hasStore: (name) => {
        if (!lStore.stores) return false
        return lStore.stores.includes(name)
    },

    createStore: (name) => {
        if (!lStore.stores) lStore.stores = []
        lStore.stores.push(name)
        localStorage.setItem('lStore.stores', JSON.stringify(lStore.stores))
        localStorage.setItem('lStore.store.' + name, JSON.stringify([]))
    },

    get: (sName) => {
        if (!lStore.hasStore(sName)) lStore.createStore(sName)
        return JSON.parse(localStorage.getItem('lStore.store.' + sName))
    },

    set: (sName, data) => {
        if (!lStore.hasStore(sName)) lStore.createStore(sName)
        localStorage.setItem('lStore.store.' + sName, JSON.stringify(data));
    },

    clear: () => {
        localStorage.clear()
    }

}

export default lStore