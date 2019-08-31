
const smartStore = {

    options: {},
    registeredModules: [],
    name: '_app-smartStore_',
    stores: false,

    hasStore: (name) => {
        if (!smartStore.stores) {
            smartStore.stores = JSON.parse(localStorage.getItem(smartStore.name + '.stores'))
            if (!smartStore.stores) {
                localStorage.setItem(smartStore.name + '.stores', JSON.stringify([]))
                smartStore.stores = []
            }
        }
        return smartStore.stores.includes(name)
    },

    createStore: (name) => {
        localStorage.setItem(smartStore.name + '.store.' + name)
        smartStore.stores.push(name)
        localStorage.setItem(smartStore.name + '.stores', JSON.stringify(smartStore.stores))
    },

    get: (sName) => {
        var data = null
        if (!smartStore.hasStore(sName))
            smartStore.createStore(sName)
        else
            data = JSON.parse(localStorage.getItem(smartStore.name + '.store.' + sName))

        return data
    },

    set: (sName, data) => {
        if (!smartStore.hasStore(sName)) smartStore.createStore(sName)
        localStorage.setItem(smartStore.name + '.store.' + sName, JSON.stringify(data))
    },

    clearModules: () => {
        smartStore.registeredModules.forEach(name => {
            smartStore.options.store.unregisterModule(name)
        })
        smartStore.registeredModules.length = 0
    },

    clearStorage: () => {
        localStorage.clear()
        smartStore.stores = false
    },

    install (Vue, opts) {
        smartStore.options = {
            ...smartStore.options,
            ...opts
        }

        Vue.mixin({

            created () {
                var modules = this.$options.modules
                if (modules) {
                    var store = smartStore.options.store
                    for (var key in modules) {
                        var mod = modules[key]
                        if (!smartStore.registeredModules.includes(mod.name)) {
                            store.registerModule(mod.name, mod.module)
                            smartStore.registeredModules.push(mod.name)
                        }
                    }
                }
            }

        })

        Vue.prototype.$smartStore = {

            clearModules: () => {
                smartStore.clear()
            },

            clearStorage: () => {
                smartStore.clear()
            }

        }
    }

}

export default smartStore
