import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'
import calories from './modules/calories'
import weight from './modules/weight'
import activity from './modules/activity'
import food from './modules/food'
Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        app,
        auth,
        user,
        calories,
        weight,
        activity,
        food
    }

})
