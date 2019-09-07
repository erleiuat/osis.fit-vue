
import Vue from 'vue'
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'training'
const namespaced = true

const state = () => {
    return {
        url: 'app/training/',
        lName: 'training',
        items: smartStore.get('training'),
        favItems: smartStore.get('training.favorites')
    }
}

const getters = {

    all: (state) => {
        if (!state.items) return
        return Object.values(state.items).reverse()
    },

    favorites: (state) => {
        if (!state.favItems) return
        return Object.values(state.favItems).reverse()
    },

    isFavorite: (state) => (itemID) => {
        if (!state.favItems) return
        if (!(itemID.toString() in state.favItems)) return false
        else return state.favItems[itemID.toString()]
    }

}

const mutations = {

    set: (state, vals) => {
        if (!Array.isArray(vals)) {
            if (!(vals.id in state.items)) Vue.set(state.items, vals.id.toString(), vals)
            else state.items[vals.id] = vals
        } else {
            vals.forEach(function (item) {
                if (!(item.id in state.items)) Vue.set(state.items, item.id.toString(), item)
                else state.items[item.id] = item
            })
        }
        smartStore.set(state.lName, state.items)
    },

    delete: (state, itemID) => {
        Vue.delete(state.items, itemID.toString())
        smartStore.set(state.lName, state.items)
    },

    setFav: (state, vals) => {
        if (!Array.isArray(vals)) {
            if (!(vals.id in state.favItems)) Vue.set(state.favItems, vals.id.toString(), vals)
            else state.favItems[vals.id] = vals
        } else {
            vals.forEach(function (item) {
                if (!(item.id in state.favItems)) Vue.set(state.favItems, item.id.toString(), item)
                else state.favItems[item.id] = item
            })
        }
        smartStore.set(state.lName + '.favorites', state.favItems)
    },

    deleteFav: (state, itemID) => {
        Vue.delete(state.favItems, itemID.toString())
        smartStore.set(state.lName + '.favorites', state.favItems)
    }

}

const actions = {

    get (con, id) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'read/', { id: id }).then(res => {
                resolve(res.data.item)
            }).catch(err => {
                reject(err)
            })
        })
    },

    load (con) {
        var fd = {
            public: false,
            query: null
        }
        Apios.post(con.state.url + 'search/', fd).then(res => {
            if (res.status === 200) con.commit('set', res.data.items)
        })
    },

    loadFavorites (con) {
        Apios.post(con.state.url + 'favorite/read/', { id: null }).then(res => {
            if (res.status === 200) con.commit('setFav', res.data.items)
        })
    },

    search (con, fd) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'search/', fd).then(res => {
                resolve(res.data.items)
            }).catch(err => {
                reject(err)
            })
        })
    },

    add (con, item) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'add/', item).then(res => {
                con.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    edit (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/', form).then(res => {
                con.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (con, itemID) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'delete/', { id: itemID }).then(() => {
                con.commit('delete', itemID)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    addFavorite (con, itemID) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'favorite/add/', { id: itemID }).then(res => {
                con.commit('setFav', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    removeFavorite (con, itemID) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'favorite/remove/', { id: itemID }).then(() => {
                con.commit('deleteFav', itemID)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }

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
