import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
Vue.use(Router)

const main = require('./routes/main')
const auth = require('./routes/auth')
const app = require('./routes/app')
const premium = require('./routes/premium')

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...main,
        ...auth,
        ...app,
        ...premium
    ]
})

router.beforeResolve((to, from, next) => {
    if (to.name) NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router
