
import Vue from 'vue'
import Apios from '@/store/Apios'

const state = {
    items: {}
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
    },

    delete: (state, itemID) => {
        Vue.delete(state.items, itemID.toString())
    }

}

const actions = {

    load (context) {
        Apios.post('food/read/', { id: null }).then(res => {
            if (res.status === 200) context.commit('set', res.data.items)
        })
    },

    add (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('food/add/', item).then(res => {
                context.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('food/edit/', form).then(res => {
                context.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (context, itemID) {
        return new Promise((resolve, reject) => {
            Apios.post('food/delete/', { id: itemID }).then(() => {
                context.commit('delete', itemID)
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
