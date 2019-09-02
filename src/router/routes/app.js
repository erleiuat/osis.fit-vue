module.exports = [{

    name: 'dashboard',
    path: '/dashboard',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Dashboard/'),
        bottom: () => import('@/views/app/Dashboard/BottomNav')
    }

}, {

    name: 'calories',
    path: '/calories/:date',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/views/app/Calories/Toolbar'),
        default: () => import('@/views/app/Calories/'),
        bottom: () => import('@/views/app/Calories/BottomNav')
    }

}, {

    name: 'weight',
    path: '/weight',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/views/app/Weight/Toolbar'),
        default: () => import('@/views/app/Weight/'),
        bottom: () => import('@/views/app/Weight/BottomNav')
    }

}, {

    name: 'activity',
    path: '/activity/:date',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/views/app/Activity/Toolbar'),
        default: () => import('@/views/app/Activity/'),
        bottom: () => import('@/views/app/Activity/BottomNav')
    }

}, {

    path: '/food',
    meta: { authRequired: true },
    components: {
        default: () => import('@/views/app/Food/'),
        toolbar: () => import('@/views/app/Food/Toolbar'),
        bottom: () => import('@/views/app/Food/BottomNav')
    },
    children: [
        {
            path: 'own',
            name: 'food',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Food/Own'),
                toolbar: () => import('@/components/nav/toolbar/')
            },
            children: [
                {
                    path: 'edit/:id',
                    name: 'food.edit',
                    components: {
                        editor: () => import('@/components/food/Editor')
                    }
                },
                {
                    path: 'add',
                    name: 'food.add',
                    components: {
                        editor: () => import('@/components/food/Editor')
                    }
                }
            ]
        },
        {
            path: 'favorites',
            name: 'food.favorites',
            meta: { authRequired: true, premium: true },
            components: {
                toolbar: () => import('@/components/nav/toolbar/'),
                default: () => import('@/views/app/Food/Favorite')
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
        toolbar: () => import('@/views/app/Settings/Layout/Toolbar'),
        default: () => import('@/views/app/Settings/')
    },
    children: [
        {
            path: 'profile',
            name: 'settings.profile',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Settings/Parts/Profile')
            }
        },
        {
            path: 'aims',
            name: 'settings.aims',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Settings/Parts/Aims')
            }
        },
        {
            path: 'metabolism',
            name: 'settings.metabolism',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Settings/Parts/Metabolism/')
            }
        },
        {
            path: 'premium',
            name: 'settings.premium',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Settings/Parts/Premium')
            }
        },
        {
            path: 'account',
            name: 'settings.account',
            meta: { authRequired: true },
            components: {
                default: () => import('@/views/app/Settings/Parts/Account/')
            }
        }
    ]

}, {

    name: 'logout',
    path: '/logout',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/app/Logout')
    }

}]
