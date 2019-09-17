
import Apios from '@/plugins/Apios'
import smartStore from '@/plugins/smartStore'

const namespaced = true

const state = () => {
    return {
        url: 'app/user/',
        lName: 'user',
        item: smartStore.get('user')
    }
}

const getters = {

    bmr: state => (weight, height, gender, birth) => {
        var dayNeed = 0

        var tmpDate = new Date(Date.now() - Date.parse(birth))
        var age = Math.abs(tmpDate.getUTCFullYear() - 1970)

        if (gender === 'female') {
            dayNeed = (
                (2.4 * weight) +
                (9.0 * height) -
                (4.7 * age) -
                65
            )
        } else {
            dayNeed = (
                (3.4 * weight) +
                (15.3 * height) -
                (6.8 * age) -
                961
            )
        }

        return Math.round(dayNeed)
    },

    metabolism: state => {
        if (!state.item) return null
        return {
            birthdate: state.item.birthdate,
            height: state.item.height,
            gender: state.item.gender,
            pal: state.item.pal
        }
    },

    dailyCalorie: state => (pal = false, bmr = false) => {

        if (!bmr) return false
        if (!pal) var cPal = 1
        else var cPal = pal

        var defDay = 15.8
        var actDay = cPal * 8
        var totDay = (defDay + actDay) / 24

        return Math.round(bmr * totDay)

    },

    user: state => {
        if (!state.item) return null
        return {
            firstname: state.item.firstname,
            lastname: state.item.lastname,
            image: state.item.image
        }
    },

    aims: state => {
        if (!state.item || !state.item.aims) return null
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
        if (!state.item) return null
        if (state.item.image) return state.item.image
        else return null
    }

}

const mutations = {

    set: (state, data) => {
        state.item = data
        smartStore.set(state.lName, state.item)
    },

    remove: state => {
        state.item = null
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
    namespaced: namespaced,
    getters,
    state,
    mutations,
    actions
}
