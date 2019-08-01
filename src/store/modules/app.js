
const state = {
    title: 'Osis.fit',
    version: '1.0',
    drawer: false,
    cookiesAccepted: true,
    language: null,
    today: null
}

const getters = {

    dark: state => {
        return state.dark
    },

    today: state => {
        if (!state.today) {
            var now = new Date()
            state.today = (new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString()).substr(0, 10)
        }
        return state.today
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
