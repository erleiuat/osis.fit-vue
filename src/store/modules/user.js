
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'user'
const namespaced = true

const state = {

    url: 'app/user/',
    lName: 'user',
    firstname: smartStore.get('user.firstname'),
    lastname: smartStore.get('user.lastname'),
    birthdate: smartStore.get('user.birthdate'),
    height: smartStore.get('user.height'),
    gender: smartStore.get('user.gender'),
    aims: smartStore.get('user.aims')

}

const mutations = {

    set: (state, data) => {
        Object.keys(state).forEach(function (key) {
            if (key in data) {
                state[key] = data[key]
                smartStore.set(state.lName + '.' + key, state[key])
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
            var data = {
                firstname: con.state.firstname,
                lastname: con.state.lastname,
                birthdate: con.state.birthdate,
                height: con.state.height,
                gender: con.state.gender,
                aims: con.state.aims
            }

            var obj = Object.assign({}, data, form)
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
    name: name,
    module: {
        namespaced: namespaced,
        state,
        mutations,
        actions
    }
}
