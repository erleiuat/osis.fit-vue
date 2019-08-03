
import Vue from 'vue'
import Apios from '@/store/Apios'

const state = {
    items: {}
}

const getters = {

    all: (state) => {
        return Object.values(state.items)
    },

    latest: (state) => {
        var a = Object.values(state.items)

        var mostRecentDate = new Date(Math.max.apply(null, a.map(e => {
            return new Date(e.date + 'T' + e.time)
        })))

        var found = a.filter(e => {
            var d = new Date(e.date + 'T' + e.time)
            return d.getTime() === mostRecentDate.getTime()
        })[0]

        if (found) {
            found.weight = Math.round(found.weight * 100) / 100
            return found
        } else return null
    }

}

const mutations = {

    addItems: (state, data) => {
        data.forEach(function (item) {
            if (!(item.id in state.items)) Vue.set(state.items, item.id.toString(), item)
            else state.items[item.id] = item
        })
    },

    deleteItem: (state, item) => {
        Vue.delete(state.items, item.id.toString())
    }

}

const actions = {

    load (context) {
        Apios.post('weight/read/', { from: '', to: '' }).then(res => {
            if (res.status === 200) context.commit('addItems', res.data.weight)
        })
    },

    add (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('weight/add/', item).then(res => {
                context.commit('addItems', [res.data.object])
                resolve()
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('weight/delete/', { id: item.id }).then(() => {
                context.commit('deleteItem', item)
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