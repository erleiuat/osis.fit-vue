
import Apios from '@/plugins/Apios'

const name = 'account'
const namespaced = true

const state = () => {
    return {
        url: 'app/auth/'
    }
}

const actions = {

    register (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/register/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    verify (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/verify/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    forgot (con) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/password/forgotten/').then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    forgot2 (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/password/forgotten/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    change (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/password/change/', form).then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    delete (con, form) {
        return new Promise((resolve, reject) => {
            Apios.post('auth/delete/', form).then(() => {
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
        actions
    }
}
