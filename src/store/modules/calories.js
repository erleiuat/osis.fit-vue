
import Vue from 'vue'
import Apios from '@/store/Apios'

const state = {
    items: {}
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
        }
        else vals.forEach(function (item) {
            if (!(item.date in state.items)) Vue.set(state.items, item.date, {})
            if (!(item.id in state.items[item.date])) Vue.set(state.items[item.date], item.id.toString(), item)
            else state.items[item.date][item.id] = item
        })
    },

    delete: (state, item) => {
        Vue.delete(state.items[item.date], item.id.toString())
    }

}

const actions = {

    load (context, date) {
        Apios.post('calories/read/', { from: date, to: date }).then(res => {
            if (res.status === 200) context.commit('set', res.data.items)
        })
    },

    add (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('calories/add/', item).then(res => {
                context.commit('set', res.data.items)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('calories/delete/', { id: item.id }).then(() => {
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
