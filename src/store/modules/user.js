import Apios from '@/plugins/Apios'
import lStore from '@/plugins/lStore'

const state = {

    url: 'app/user/',
    lName: 'user',
    firstname: lStore.get('user.firstname'),
    lastname: lStore.get('user.lastname'),
    birthdate: lStore.get('user.birthdate'),
    height: lStore.get('user.height'),
    gender: lStore.get('user.gender'),
    aims: lStore.get('user.aims'),


}

const mutations = {

    set: (state, data) => {
        Object.keys(state).forEach(function (key) {
            if (key in data) {
                state[key] = data[key]
                lStore.set(state.lName + '.' + key, state[key])
            }
        })
    }

}

const actions = {

    load (con) {
        Apios.get(con.state.url + 'read/').then(res => {
            con.commit('set', res.data.item)
        })
    },

    edit (con, form) {
        return new Promise((resolve, reject) => {
            var obj = Object.assign({}, con.state, form)
            Apios.post(con.state.url + 'edit/', obj).then(res => {
                con.commit('set', res.data.item)
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
    mutations,
    actions
}
