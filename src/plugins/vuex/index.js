import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from '@/plugins/vuex/modules/app'
import auth from '@/plugins/vuex/modules/auth'


export default new Vuex.Store({
    modules: {
        app, auth
    }
})
