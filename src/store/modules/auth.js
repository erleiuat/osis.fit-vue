import Apios from '@/store/Apios'

const state = {

    status: false,
    access: {
        token: null,
        expire: null
    },
    refresh: {
        token: null,
        expire: null
    },
    user: {
        id: null,
        mail: null,
        level: null
    }

}

const getters = {
    status: state => {
        return state.status
    }
}

const mutations = {

    setAccess: (state, payload) => {
        state.access = payload
    },
    setRefresh: (state, payload) => {
        state.refresh = payload
    },
    setUser: (state, payload) => {
        state.user = payload
    }

}

const actions = {

    login (context, data) {
        return new Promise((resolve, reject) => {

            Apios.post('auth/', data).then(r => {

                context.commit('setAccess', data.access)
                context.commit('setRefresh', data.refresh)
                context.commit('setUser', data.user)

                resolve()

            }, error => {
                reject(error.response.data.condition)
            })

        })
    },

    logout: async (context, payload) => {
        let { data } = await Axios.post('http://yourwebsite.com/api/todo')
        context.commit('ADD_TODO', payload)
    }

}

export default {
    namespaced: true,
    state, getters, mutations, actions
}
