
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'activity'
const namespaced = true

const state = () => {
    return {
        url: 'app/activity/',
        lName: 'activity',
        items: smartStore.get('activity')
    }
}

const getters = {

    byDate: (state) => (date) => {
        if (!date || !(date in state.items)) return
        return Object.values(state.items[date])
    },

    total: (state) => (date) => {
        if (date && (date in state.items)) {
            var total = 0
            Object.values(state.items[date]).forEach(function (element) {
                total += element.calories
            })
            return total
        }
    }

}

const mutations = {

    set: (state, vals) => {
        if (!Array.isArray(vals)) {
            if (!(vals.date in state.items)) Vue.set(state.items, vals.date, {})
            if (!(vals.id in state.items[vals.date])) Vue.set(state.items[vals.date], vals.id.toString(), vals)
            else state.items[vals.date][vals.id] = vals
        } else vals.forEach(function (item) {
            if (!(item.date in state.items)) Vue.set(state.items, item.date, {})
            if (!(item.id in state.items[item.date])) Vue.set(state.items[item.date], item.id.toString(), item)
            else state.items[item.date][item.id] = item
        })
        smartStore.set(state.lName, state.items)
    },

    delete: (state, item) => {
        Vue.delete(state.items[item.date], item.id.toString())
        smartStore.set(state.lName, state.items)
    }

}

const actions = {

    load (con, date) {
        Apios.post(con.state.url + 'read/', { from: date, to: date }).then(res => {
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
