import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import auth from './modules/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        auth
    }
})

const registeredModules = []

store.useModule = (mod) => {
    if (!registeredModules.includes(mod.name)) {
        store.registerModule(mod.name, mod.module)
        registeredModules.push(mod.name)
    }
}

store.removeModules = () => {
    registeredModules.forEach(name => {
        store.unregisterModule(name)
    })
    registeredModules.length = 0
}

export default store
