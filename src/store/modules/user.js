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
        Apios.get('user/read/').then(r => {
            context.commit('setUser', r.data.data.user)
        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            var obj = Object.assign({}, context.state, form)
            Apios.post('user/edit/', obj).then(r => {
                context.commit('setUser', obj)
                resolve()
            }, error => {
                reject(error.response.data.condition)
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
