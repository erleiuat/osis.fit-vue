import Apios from '@/store/Apios'

const state = {

    firstname: null,
    lastname: null,
    birthdate: null,
    height: null,
    gender: null,
    aims: {
        weight: null,
        date: null
    }

}

const getters = {

}

const mutations = {

    setUser: (state, data) => {
        Object.keys(state).forEach(function (key) {
            if (key in data) state[key] = data[key]
        })
    }

}

const actions = {

    load (context) {
        Apios.get('user/read/').then(res => {
            context.commit('setUser', res.data.user)
        }).catch(() => {

        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            var obj = Object.assign({}, context.state, form)
            Apios.post('user/edit/', obj).then(() => {
                context.commit('setUser', obj)
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
