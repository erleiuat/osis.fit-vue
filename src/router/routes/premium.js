module.exports = [{
    name: 'premium',
    path: '/premium',
    meta: { authRequired: true },
    components: {
        toolbar: () => import('@/components/nav/toolbar/'),
        default: () => import('@/views/premium/')
    }
}]
