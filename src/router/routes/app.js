export default [{

    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/app/Dashboard/'),
    meta: { authRequired: true }

}, {

    name: 'calories',
    path: '/calories',
    component: () => import('@/views/app/Calories/'),
    meta: { authRequired: true }

}, {

    name: 'weight',
    path: '/weight',
    component: () => import('@/views/app/Weight/'),
    meta: { authRequired: true }

}, {

    name: 'activity',
    path: '/activity',
    component: () => import('@/views/app/Activity/'),
    meta: { authRequired: true }

}, {

    path: '/food',
    name: 'food.index',
    component: () => import('@/views/app/Food/'), // TODO REDIRECT TO CHILD
    meta: { authRequired: true },
    children: [
        {
            path: 'own',
            name: 'food.own',
            component: () => import('@/views/app/Food/Own'),
            meta: { authRequired: true }
        },
        {
            path: 'favorites',
            name: 'food.favorites',
            component: () => import(/* webpackChunkName: "premium" */'@/views/app/Food/Favorite'),
            meta: { authRequired: true, premium: true }
        },
        {
            path: 'browse',
            name: 'food.browse',
            component: () => import(/* webpackChunkName: "premium" */ '@/views/app/Food/Browse'),
            meta: { authRequired: true, premium: true }
        }
    ]

}, {

    name: 'settings',
    path: '/settings',
    component: () => import('@/views/app/Settings/'),
    meta: { authRequired: true }

}]