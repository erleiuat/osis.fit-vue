
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'foodFavorite'
const namespaced = true

const state = () => {
    return {
        url: 'app/food/favorite/',
        lName: 'foodFavorite',
        items: smartStore.get('foodFavorite')
    }
}

const getters = {

    all: (state) => {
        if (!state.items) return
        return Object.values(state.items).reverse()
    },

    id: (state) => (itemID) => {
        if (!state.items) return
        if (!(itemID.toString() in state.items)) return false
        else return state.items[itemID.toString()]
    }

}

const mutations = {

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

    load (con) {
        Apios.post(con.state.url + 'read/', { id: null }).then(res => {
            if (res.status === 200) con.commit('set', res.data.items)
        })
    },

    search (con, query) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'search/', { query: query }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    add (con, item) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'add/', item).then(res => {
                con.commit('set', res.data.item)
                resolve()
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
