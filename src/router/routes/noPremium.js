module.exports = [{
    name: 'premium',
    path: '/premium',
    component: () => import('@/views/premium/'),
    meta: { authRequired: true }
}]
