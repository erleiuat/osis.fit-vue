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
            }
        ]
    }
]
