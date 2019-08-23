
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const name = 'user'
const namespaced = true

const state = () => {
    return {
        url: 'app/user/',
        lName: 'user',
        item: smartStore.get('user')
    }
}

const getters = {

    user: state => {
        if (!state.item) return null
        return {
            firstname: state.item.firstname,
            lastname: state.item.lastname,
            image: state.item.image
        }
    },

    metabolism: state => {
        if (!state.item) return null
        return {
            birthdate: state.item.birthdate,
            height: state.item.height,
            gender: state.item.gender,
            pal: state.item.pal,
        }
    },

    aims: state => {
        if (!state.item) return null
        return {
            weight: state.item.aims.weight,
            date: state.item.aims.date
        }
    },

    fullName: state => {
        if (!state.item) return null
        return state.item.firstname + ' ' + state.item.lastname
    },

    image: state => {
        console.log(state.item.image)
        if (!state.item) return null
        if (state.item.image) return state.item.image
        else return null
    }

}

const mutations = {

    set: (state, data) => {
        state.item = data
        smartStore.set(state.lName, state.item)
    }

}

const actions = {

    load (con) {
        Apios.get(con.state.url + 'read/').then(res => {
            con.commit('set', res.data.item)
        })
    },

    editProfile (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/profile/', form).then(res => {
                con.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    editAims (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/aims/', form).then(res => {
                con.commit('set', res.data.item)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    editMetabolism (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post(con.state.url + 'edit/metabolism/', form).then(res => {
                con.commit('set', res.data.item)
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
        getters,
        state,
        mutations,
        actions
    }
}
