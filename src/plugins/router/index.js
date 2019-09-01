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
                toolbar: () => import('@/views/Auth/Toolbar'),
                default: () => import('@/views/Main')
            }
        },

        {
            path: '/auth',
            redirect: { name: 'auth.login' },
            components: {
                toolbar: () => import('@/views/Auth/Toolbar'),
                default: () => import('@/views/Auth/')
            },
            children: [
                {
                    path: 'login',
                    name: 'auth.login',
                    components: {
                        default: () => import('@/views/Auth/Login/')
                    }
                },
                {
                    path: 'register',
                    name: 'auth.register',
                    components: {
                        default: () => import('@/views/Auth/Register')
                    }
                }
            ]
        }

    ]
})
