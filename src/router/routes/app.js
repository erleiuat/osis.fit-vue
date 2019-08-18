module.exports = [{

    name: 'dashboard',
    path: '/dashboard',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Dashboard/')
    }

}, {

    name: 'calories',
    path: '/calories',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Calories/')
    }

}, {

    name: 'weight',
    path: '/weight',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Weight/')
    }

}, {

    name: 'activity',
    path: '/activity',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Activity/')
    }

}, {

    path: '/food',
    name: 'food.index',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/views/app/Food/Toolbar'),
        default: () => import('@/views/app/Food/') // TODO REDIRECT TO CHILD
    },
    children: [
        {
            path: 'own',
            name: 'food.own',
            meta: { authRequired: true },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Food/Own')
            }
        },
        {
            path: 'favorites',
            name: 'food.favorites',
            meta: { authRequired: true, premium: true },

            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Food/Favorite')
            }
        },
        {
            path: 'browse',
            name: 'food.browse',
            meta: { authRequired: true, premium: true },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Food/Browse')
            }
        }
    ]

}, {

    path: '/training',
    name: 'training.index',
    meta: { authRequired: true, premium: true },
    components: {
        toolbar: () => import('@/views/app/Training/Toolbar'),
        default: () => import('@/views/app/Training/') // TODO REDIRECT TO CHILD
    },
    children: [
        {
            path: '#/:id',
            name: 'training',
            meta: { authRequired: true, premium: true },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Training/Training')
            }
        },
        {
            path: 'saved',
            name: 'training.saved',
            meta: { authRequired: true, premium: true },
            components: {
                toolbar: () => import('@/views/app/Training/Toolbar'),
                default: () => import('@/views/app/Training/Saved')
            }
        },
        {
            path: 'exercise',
            name: 'training.exercise.index',
            meta: { authRequired: true, premium: true },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Training/Exercise/')
            },
            children: [
                {
                    path: '#/:id',
                    name: 'training.exercise',
                    meta: { authRequired: true, premium: true },
                    components: {
                        toolbar: () => import('@/components/nav/toolbar/'),
                        default: () => import('@/views/app/Training/Exercise/Exercise')
                    }
                },
                {
                    path: 'saved',
                    name: 'training.exercise.saved',
                    meta: { authRequired: true, premium: true },
                    components: {
                        toolbar: () => import('@/components/nav/toolbar/'),
                        default: () => import('@/views/app/Training/Exercise/Saved')
                    }
                }
            ]
        }
    ]

}, {

    name: 'settings',
    path: '/settings',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Settings/')
    }

}, {

    name: 'logout',
    path: '/logout',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/auth/Logout')
    }

}]
