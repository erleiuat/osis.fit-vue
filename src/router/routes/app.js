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
        name: 'weight',
        path: '/weight',
        component: () => import('@/views/app/Weight/'),
        meta: { authRequired: true }
    },
    {
        name: 'activity',
        path: '/activity',
        component: () => import('@/views/app/Activity/'),
        meta: { authRequired: true }
    },
    {
        name: 'templates',
        path: '/templates',
        component: () => import('@/views/app/Templates/'), // TODO REDIRECT TO CHILD
        meta: { authRequired: true },
        children: [
            {
                path: 'own',
                name: 'templates.own',
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
