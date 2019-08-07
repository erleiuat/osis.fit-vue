
const state = {
    title: 'Osis.fit',
    version: '1.0.1',
    drawer: false,
    cookiesAccepted: true,
    lang: null,
    today: null
}

const getters = {

    dark: state => {
        return state.dark
    },

    today: state => {
        if (!state.today) {
            var now = new Date()
            state.today = (new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString())
        }
        return {
            date: state.today.substr(0, 10),
            time: state.today.substr(11, 5)
        }
    }

}

const mutations = {
    setDrawer: (state, condition) => {
        state.drawer = condition
    }
}

const actions = {
    drawer (con) {
        con.commit('setDrawer', !con.state.drawer)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
