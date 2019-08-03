
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

    delete: (state, item) => {
        Vue.delete(state.items, item.id.toString())
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
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            Apios.post('food/edit/', form).then(res => {
                context.commit('set', res.data.item)
                resolve()
            }, err => {
                reject(err)
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('food/delete/', { id: item.id }).then(() => {
                context.commit('delete', item)
                resolve()
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
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