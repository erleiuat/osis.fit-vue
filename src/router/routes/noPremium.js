module.exports = [
    {
        name: 'premium',
        path: '/premium',
        component: () => import('@/views/premium/'),
        meta: { authRequired: true },
        children: [
            {
                path: 'new',
                name: 'premium.new',
                component: () => import('@/views/premium/Overview'),
                meta: { authRequired: true }
            },
            {
                path: 'settings',
                name: 'premium.settings',
                component: () => import('@/views/premium/Settings'),
                meta: { authRequired: true }
            }
        ]
    }
]
