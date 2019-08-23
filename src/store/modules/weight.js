
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'weight'
const namespaced = true

const state = () => {
    return {
        url: 'app/weight/',
        lName: 'weight',
        items: smartStore.get('weight')
    }
}

const getters = {

    all: (state) => {
        if (!state.items) return
        return Object.values(state.items)
    },

    latest: (state) => {
        if (!state.items) return
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
        smartStore.set(state.lName, state.items)
    },

    delete: (state, item) => {
        Vue.delete(state.items, item.id.toString())
        smartStore.set(state.lName, state.items)
    }

}

const actions = {

    load (con) {
        Apios.post(con.state.url + 'read/', { from: '', to: '' }).then(res => {
            if (res.status === 200) con.commit('set', res.data.items)
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

    delete (con, item) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'delete/', { id: item.id }).then(() => {
                con.commit('delete', item)
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
