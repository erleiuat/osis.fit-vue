module.exports = [
    {
        path: '/premium',
        component: () => import('@/views/app/Premium/'), // TODO REDIRECT TO CHILD
        meta: { authRequired: true },
        children: [
            {
                path: '',
                name: 'premium',
                component: () => import('@/views/app/Premium/Overview'),
                meta: { authRequired: true }
            },
            {
                path: 'settings',
                name: 'premium.settings',
                component: () => import('@/views/app/Premium/Settings'),
                meta: { authRequired: true }
            }
        ]
    }
]
