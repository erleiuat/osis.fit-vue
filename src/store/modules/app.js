
const state = {
    title: 'Osis.fit',
    version: '1.0',
    drawer: false,
    cookiesAccepted: true,
    language: null
}

const getters = {
    dark: state => {
        return state.dark
    }
}

const mutations = {
    setDrawer: (state, condition) => {
        state.drawer = condition
    }
}

const actions = {
    drawer (context) {
        context.commit('setDrawer', !context.state.drawer)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
