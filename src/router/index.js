import Vue from 'vue'
import Router from 'vue-router'

const main = require('./routes/main')
const auth = require('./routes/auth')
const app = require('./routes/app')

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...main,
        ...auth,
        ...app
    ]

})
