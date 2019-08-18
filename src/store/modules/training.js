
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'training'
const namespaced = true

const state = () => {
    return {
        url: 'app/training/',
        lName: 'training',
        items: smartStore.get('training')
    }
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
        smartStore.set(state.lName, state.items)
    },

    delete: (state, itemID) => {
        Vue.delete(state.items, itemID.toString())
        smartStore.set(state.lName, state.items)
    }

}

const actions = {

    load (con) {
        var fd = {
            public: false,
            query: null
        }
        Apios.post(con.state.url + 'search/', fd).then(res => {
            if (res.status === 200) con.commit('set', res.data.items.own)
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

    edit (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/', form).then(res => {
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