import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/',
            name: 'main',
            components: {
                toolbar: () => import('@/components/navigation/toolbar/'),
                default: () => import('@/views/Main')
            }
        }
    ]
})
