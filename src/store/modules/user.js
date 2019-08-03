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
            context.commit('set', res.data.user)
        }).catch(err => {
            reject(err)
        })
    },

    edit (context, form) {
        return new Promise((resolve, reject) => {
            var obj = Object.assign({}, context.state, form)
            Apios.post('user/edit/', obj).then(() => {
                context.commit('set', obj)
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
