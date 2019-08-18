
module.exports = [{

    path: '/',
    name: 'start',
    meta: { authRequired: false }

}, {

    path: '/terms',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/Terms/')
    },
    children: [
        {
            path: '',
            name: 'terms',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/Terms/List')
            }
        },
        {
            path: 'cookies',
            name: 'terms.cookie',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/Terms/Cookie')
            }
        }
    ]

}, {

    path: '/help',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/Help/')
    },
    children: [
        {
            name: 'help',
            path: 'faq',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/Help/FAQ')
            }
        },
        {
            name: 'help.contact',
            path: 'contact',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/Help/Contact')
            }
        }
    ]

}, {

    name: 'theme',
    path: '/theme',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/Theme')
    }

}, {

    path: '/error',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/error/')
    },
    children: [
        {
            path: '401',
            name: 'error.permission',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/error/NoPermission')
            }
        },
        {
            path: '404',
            name: 'error.found',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/error/NotFound')
            }
        }
    ]

}, {

    path: '*',
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/error/NotFound')
    }

}]
