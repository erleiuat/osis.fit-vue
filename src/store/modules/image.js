
import Apios from '@/plugins/Apios'
import NProgress from '@/plugins/nprogress'

const state = {

    progress: false

}

const getters = {

    progress: (state) => {
        return state.progress || 0
    }

}

const mutations = {

    progress: (state, number) => {
        if (number === false) state.progress = false
        else state.progress = number
    }

}

const actions = {

    add (context, fData) {
        NProgress.configure({ trickle: false })

        return new Promise((resolve, reject) => {
            context.commit('progress', 0.1)

            var config = {
                onUploadProgress: function (progressEvent) {
                    var val = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    context.commit('progress', val || 0.1)
                    NProgress.set(val / 100)
                }
            }

            Apios.post('upload/', fData, config).then(res => {
                resolve({
                    id: res.data.item.id,
                    path: res.data.item.path
                })
            }).catch(err => {
                reject(err)
            }).finally(() => {
                NProgress.configure({ trickle: true })
                context.commit('progress', false)
            })
        })
    }

    /* TODO ???
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
    */

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
