
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

    name: 'about',
    path: '/about',
    meta: { authRequired: false },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/general/About')
    }

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
