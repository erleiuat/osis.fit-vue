
const name = 'toolbar'
const namespaced = true

const state = () => {
    return {
        show: {
            search: false,
            add: false
        },
        searchQuery: null
    }
}

const getters = {

    show: (state) => {
        return state.show
    },

    search: (state) => {
        return state.searchQuery
    }

}

const mutations = {

    show: (state, val) => {
        state.show[val] = true
    },

    hide: (state, val) => {
        state.show[val] = true
    },

    search: (state, val) => {
        state.searchQuery = val
    }


}

const actions = {

   

}

export default {
    name: name,
    module: {
        namespaced: namespaced,
        state,
        getters,
        mutations,
        actions
    }
}
