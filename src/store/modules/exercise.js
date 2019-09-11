
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'exercise'
const namespaced = true

const state = () => {
    return {
        url: 'app/exercise/',
        lName: 'exercise',
        items: smartStore.get('exercise'),
        types: ['strength', 'stamina', 'fitness', 'flexibility', 'coordination'],
        bodyparts: [
            { type: 'muscle', id: 'chest' },
            { type: 'muscle', id: 'bicep' },
            { type: 'muscle', id: 'tricep' },
            { type: 'muscle', id: 'fShoulder' },
            { type: 'muscle', id: 'rShoulder' },
            { type: 'muscle', id: 'mShoulder' },
            { type: 'muscle', id: 'latissimus' },
            { type: 'muscle', id: 'trapezoid' },
            { type: 'muscle', id: 'cLowerBack' },
            { type: 'muscle', id: 'lStretcher' },
            { type: 'muscle', id: 'lFlexor' },
            { type: 'muscle', id: 'neck' },
            { type: 'muscle', id: 'laAbdomina' },
            { type: 'muscle', id: 'loAbdomina' },
            { type: 'muscle', id: 'upAbdomina' }
        ]
    }
}

const getters = {
    id: (state) => (id) => {
        if (state.items[id]) return state.items[id]
    },
    types: (state) => {
        return state.types
    },
    bodyparts: (state) => {
        return state.bodyparts
    },
    all: (state) => {
        if (!state.items) return
        return Object.values(state.items).reverse()
    }
}

const mutations = {

    syncSet: (state, vals) => {
        var syncKeys = []
        vals.forEach((item) => {
            syncKeys.push(item.id.toString())
            if (!(item.id in state.items)) Vue.set(state.items, item.id.toString(), item)
            else state.items[item.id] = item
        })
        Object.keys(state.items).forEach(elKey => {
            if (!syncKeys.includes(elKey)) {
                Vue.delete(state.items, elKey)
            }
        });
        smartStore.set(state.lName, state.items)
    },

    set: (state, vals) => {
        if (!Array.isArray(vals)) {
            if (!(vals.id in state.items)) Vue.set(state.items, vals.id.toString(), vals)
            else state.items[vals.id] = vals
        } else {
            vals.forEach(function (item) {
                if (!(item.id in state.items)) Vue.set(state.items, item.id.toString(), item)
                else state.items[item.id] = item
            })
        }
        smartStore.set(state.lName, state.items)
    },

    delete: (state, itemID) => {
        Vue.delete(state.items, itemID.toString())
        smartStore.set(state.lName, state.items)
    }

}

const actions = {

    get (con, id) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'read/', { id: id }).then(res => {
                if (res.data.item) resolve(res.data.item)
                else if (res.data.items) resolve(res.data.items)
            }).catch(err => {
                reject(err)
            })
        })
    },

    load (con) {
        var fd = {
            public: false,
            query: null,
            bodyparts: []
        }
        Apios.post(con.state.url + 'search/', fd).then(res => {
            if (res.status === 200) con.commit('syncSet', res.data.items)
        })
    },

    search (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'search/', form).then(res => {
                resolve(res.data.items)
            }).catch(err => {
                reject(err)
            })
        })
    },

    add (con, item) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'add/', item).then(res => {
                con.commit('set', res.data.item)
                resolve(res.data.item.id)
            }).catch(err => {
                reject(err)
            })
        })
    },

    edit (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/', form).then(res => {
                con.commit('set', res.data.item)
                resolve(res.data.id)
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (con, itemID) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'delete/', { id: itemID }).then(() => {
                con.commit('delete', itemID)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }

}

export default {
    name: name,
    module: {
        namespaced: namespaced,
        state,
        getters,
        mutations,
        actions
    }
}
