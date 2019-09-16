
module.exports = [{

    path: '/',
    name: 'start',
    meta: { authRequired: false }

}, {

    path: '/help',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/Help/')
    },
    children: [
        {
            path: '',
            name: 'help',
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

    path: '/about',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/views/general/About/Toolbar'),
        default: () => import('@/views/general/About/')
    },
    children: [
        {
            path: '',
            name: 'about',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/About/Info.vue')
            }
        },
        {
            path: 'imprint',
            name: 'about.imprint',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/About/docs/Imprint')
            }
        },
        {
            path: 'terms',
            name: 'about.terms',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/About/docs/Terms')
            }
        },
        {
            path: 'cookies',
            name: 'about.cookie',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/About/docs/Cookie')
            }
        },
        {
            path: 'data',
            name: 'about.data',
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/general/About/docs/Data')
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

    name: 'grid',
    path: '/grid',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/Grid')
    }

}, {

    path: '/error',
    name: 'error',
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
            meta: { authRequired: false },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/error/NotFound')
            }
        }
    ]

}, {

    path: '*',
    name: 'error.found',
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/error/')
    }

}]
