module.exports = [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/app/Dashboard/'),
        meta: { authRequired: true }
    },
    {
        name: 'calories',
        path: '/calories',
        component: () => import('@/views/app/Calories/'),
        meta: { authRequired: true }
    },
    {
        name: 'weights',
        path: '/weights',
        component: () => import('@/views/app/Weights/'),
        meta: { authRequired: true }
    },
    {
        name: 'activity',
        path: '/activity',
        component: () => import('@/views/app/Activity/'),
        meta: { authRequired: true }
    },
    {
        name: '',
        path: '/templates',
        component: () => import('@/views/app/Templates/'),
        meta: { authRequired: true },
        children: [
            {
                path: '',
                name: 'templates',
                component: () => import('@/views/app/Templates/Own'),
                meta: { authRequired: true }
            },
            {
                path: 'favorite',
                name: 'templates.favorite',
                component: () => import('@/views/app/Templates/Favorite'),
                meta: { authRequired: true }
            },
            {
                path: 'browse',
                name: 'templates.browse',
                component: () => import('@/views/app/Templates/Browse'),
                meta: { authRequired: true }
            }
        ]
    },
    {
        name: 'settings',
        path: '/settings',
        component: () => import('@/views/app/Settings/'),
        meta: { authRequired: true }
    }
]
