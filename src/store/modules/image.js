
import Apios from '@/plugins/Apios'
import NProgress from '@/plugins/nprogress'

const name = 'image'
const namespaced = true

const state = {
    url: 'upload/',
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

    add (con, fData) {
        NProgress.configure({ trickle: false })

        return new Promise((resolve, reject) => {
            con.commit('progress', 0.1)

            var config = {
                onUploadProgress: function (progressEvent) {
                    var val = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    con.commit('progress', val || 0.1)
                    NProgress.set(val / 100)
                }
            }

            Apios.post(con.state.url, fData, config).then(res => {
                resolve({
                    id: res.data.item.id,
                    path: res.data.item.path
                })
            }).catch(err => {
                reject(err)
            }).finally(() => {
                NProgress.configure({ trickle: true })
                con.commit('progress', false)
            })
        })
    }

    /* TODO ???
    delete (con, item) {
        return new Promise((resolve, reject) => {
            Apios.post('food/delete/', { id: item.id }).then(() => {
                con.commit('deleteItem', item)
                resolve()
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
        })
    }
    */

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
