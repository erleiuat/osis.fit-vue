module.exports = [
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@/views/auth/'),
        meta: { authRequired: false },
        children: [
            {
                path: 'login',
                name: 'auth.login',
                component: () => import('@/views/auth/Login'),
                meta: { authRequired: false }
            },
            {
                path: 'logout',
                name: 'auth.logout',
                component: () => import('@/views/auth/Logout'),
                meta: { authRequired: true }
            },
            {
                path: 'register',
                name: 'auth.register',
                component: () => import('@/views/auth/Register'),
                meta: { authRequired: false }
            },
            {
                path: 'verify',
                name: 'auth.verify',
                component: () => import('@/views/auth/Verify'),
                meta: { authRequired: false }
            },
            {
                path: 'forgotten',
                name: 'auth.forgotten',
                component: () => import('@/views/auth/Forgotten'),
                meta: { authRequired: false }
            }
        ]
    }
]
