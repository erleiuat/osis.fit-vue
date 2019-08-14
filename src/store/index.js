import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'
import calories from './modules/calories'
import weight from './modules/weight'
import activity from './modules/activity'
import food from './modules/food'
import foodFavorite from './modules/foodFavorite'
import image from './modules/image'
Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        app,
        auth,
        user,
        calories,
        weight,
        activity,
        food,
        foodFavorite,
        image
    }

})
