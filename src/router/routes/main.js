module.exports = [
    {
        path: '/',
        name: 'start',
        meta: { authRequired: false }
    },
    {
        name: 'welcome',
        path: '/welcome',
        component: () => import('@/views/general/Welcome'),
        meta: { authRequired: false }
    },
    {
        path: '/terms',
        component: () => import('@/views/general/Terms/'),
        meta: { authRequired: false },
        children: [
            {
                path: '',
                name: 'terms',
                component: () => import('@/views/general/Terms/List'),
                meta: { authRequired: false }
            },
            {
                path: 'cookies',
                name: 'terms.cookie',
                component: () => import('@/views/general/Terms/Cookie'),
                meta: { authRequired: false }
            }
        ]
    },
    {
        path: '/help',
        component: () => import('@/views/general/Help/'),
        meta: { authRequired: false },
        children: [
            {
                name: 'help',
                path: 'faq',
                component: () => import('@/views/general/Help/FAQ'),
                meta: { authRequired: false }
            },
            {
                name: 'help.contact',
                path: 'contact',
                component: () => import('@/views/general/Help/Contact'),
                meta: { authRequired: false }
            }
        ]
    },
    {
        name: 'theme',
        path: '/theme',
        component: () => import('@/views/general/Theme'),
        meta: { authRequired: false }
    },
    {
        path: '/error',
        component: () => import('@/views/error/'),
        meta: { authRequired: false },
        children: [
            {
                path: '401',
                name: 'error.permission',
                component: () => import('@/views/error/NoPermission'),
                meta: { authRequired: false }
            },
            {
                path: '404',
                name: 'error.found',
                component: () => import('@/views/error/NotFound'),
                meta: { authRequired: false }
            }
        ]
    },
    {
        path: '*',
        component: () => import('@/views/error/NotFound')
    }
]
