
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
        Apios.post('weight/read/', { from: '', to: '' }).then(res => {
            if (res.status === 200) context.commit('addItems', res.data.items)
        })
    },

    add (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('weight/add/', item).then(res => {
                context.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('weight/delete/', { id: item.id }).then(() => {
                context.commit('delete', item)
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
