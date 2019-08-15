
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import lStore from '@/plugins/lStore'

const state = {
    url: 'app/food/favorite/',
    lName: 'foodFavorite',
    items: lStore.get('foodFavorite')
}

const getters = {

    all: (state) => {
        return Object.values(state.items).reverse()
    }

}

const mutations = {

    set: (state, vals) => {
        if (!Array.isArray(vals))
            if (!(vals.id in state.items)) Vue.set(state.items, vals.id.toString(), vals)
            else state.items[vals.id] = vals
        else vals.forEach(function (item) {
            if (!(item.id in state.items)) Vue.set(state.items, item.id.toString(), item)
            else state.items[item.id] = item
        })
        lStore.set(state.lName, state.items)
    },

    delete: (state, itemID) => {
        Vue.delete(state.items, itemID.toString())
        lStore.set(state.lName, state.items)
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
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
