
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

        if (!date || !(date in state.items)) return
        else {
            var total = 0;
            Object.values(state.items[date]).forEach(function (element) {
                total += element.calories
            });
            return total;
        }

    }

}

const mutations = {

    addItems: (state, data) => {
        data.forEach(function (item) {
            if (!(item.date in state.items)) Vue.set(state.items, item.date, {})
            if (!(item.id in state.items[item.date])) Vue.set(state.items[item.date], item.id.toString(), item)
            else state.items[item.date][item.id] = item
        });
    },

    deleteItem: (state, item) => {
        Vue.delete(state.items[item.date], item.id.toString())
    }

}

const actions = {

    load (context, date) {
        Apios.post('calories/read/', { from: date, to: date }).then(res => {
            if (res.status === 200) context.commit('addItems', res.data.calories)
        })
    },

    add (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('calories/add/', item).then(res => {
                context.commit('addItems', [res.data.object])
                resolve()
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('calories/delete/', { id: item.id }).then(() => {
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
