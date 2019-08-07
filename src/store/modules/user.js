import Apios from '@/plugins/Apios'

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

const mutations = {

    set: (state, data) => {
        Object.keys(state).forEach(function (key) {
            if (key in data) state[key] = data[key]
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
