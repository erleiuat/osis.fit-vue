module.exports = [{

    name: 'auth',
    path: '/auth',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/auth/')
    },
    children: [
        {
            path: '/welcome',
            name: 'welcome',
            meta: { authRequired: false },
            components: {
                default: () => import('@/views/auth/Welcome')
            }
        },
        {
            path: 'login',
            name: 'auth.login',
            meta: { authRequired: false },
            components: {
                default: () => import('@/views/auth/Login')
            }
        },
        {
            path: 'register',
            name: 'auth.register',
            meta: { authRequired: false },
            components: {
                default: () => import('@/views/auth/Register')
            }
        },
        {
            path: 'verify',
            name: 'auth.verify',
            meta: { authRequired: false },
            components: {
                default: () => import('@/views/auth/Verify')
            }
        },
        {
            path: 'forgotten',
            name: 'auth.forgotten',
            meta: { authRequired: false },
            components: {
                default: () => import('@/views/auth/Forgotten')
            }
        }
    ]

}]
