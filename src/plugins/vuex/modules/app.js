import Vue from 'vue'

const namespaced = true

const state = () => {
    return {
        drawer: false,
        dark: false,
        locale: 'en'
    }
}

const getters = {

    drawer: state => {
        return state.drawer
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
    namespaced: namespaced,
    state,
    getters,
    mutations,
    actions
}
