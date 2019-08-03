
import Vue from 'vue'
import Apios from '@/store/Apios'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

    load (context) {
        Apios.post('food/read/', { id: null }).then(res => {
            if (res.status === 200) context.commit('addItems', res.data.items)
        })
    },

    add (context, fData) {
        return new Promise((resolve, reject) => {
            Apios.post('upload/', fData).then(res => {
                resolve({
                    id: res.data.item.id,
                    fullPath: res.data.item.fullPath,
                    lazyPath: res.data.item.lazyPath
                })
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('food/delete/', { id: item.id }).then(() => {
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
