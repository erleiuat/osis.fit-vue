
const lStore = {

    get: (sName) => {
        var items = JSON.parse(localStorage.getItem('lStore.store'))
        if (items[sName]) return items[sName].data
        return {}
    },

    set: (sName, data) => {
        var tmp = JSON.parse(localStorage.getItem('lStore.store'))
        var d = new Date()
        tmp[sName] = {
            stamp: d.getTime(),
            data: data
        }
        localStorage.setItem('lStore.store', JSON.stringify(tmp));
    },

    init: () => {
        localStorage.setItem('lStore.store', JSON.stringify({}));
    },

    clear: () => {
        localStorage.clear()
    }

}

export default lStore