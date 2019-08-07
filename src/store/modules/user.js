import Apios from '@/plugins/Apios'
import lStore from '@/plugins/lStore'

const state = {

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
                lStore.set(state.lName +'.'+ key, state[key])
            }
        })
    }

}

const actions = {

    load (context) {
        Apios.get('user/read/').then(res => {
            context.commit('set', res.data.item)
        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            var obj = Object.assign({}, context.state, form)
            Apios.post('user/edit/', obj).then(res => {
                context.commit('set', res.data.item)
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
