
const lStore = {

    get: (sName) => {
        var items = JSON.parse(localStorage.getItem('store.' + sName));
        if (!items) return {}
        return items
    },

    set: (sName, data) => {
        localStorage.setItem('store.'+sName, JSON.stringify(data));
    }

}

export default lStore