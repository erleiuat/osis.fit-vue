module.exports = [
    {
        path: '/blog',
        component: () => import('@/views/general/Blog/'),
        meta: { authRequired: false },
        children: [
            {
                path: '',
                name: 'blog',
                component: () => import('@/views/general/Blog/Overview'),
                meta: { authRequired: false }
            },
            {
                path: 'article/:url',
                name: 'blog.article',
                component: () => import('@/views/general/Blog/Article'),
                meta: { authRequired: false }
            },
            {
                path: 'editor',
                meta: { authRequired: true },
                component: () => import('@/views/general/Blog/Editor/'),
                children: [
                    {
                        path: 'list',
                        name: 'blog.editor',
                        component: () => import('@/views/general/Blog/Editor/List'),
                        meta: { authRequired: true }
                    },
                    {
                        path: 'edit/:url',
                        name: 'blog.editor.edit',
                        component: () => import('@/views/general/Blog/Editor/Edit/'),
                        meta: { authRequired: true }
                    },
                    {
                        path: 'add',
                        name: 'blog.editor.add',
                        component: () => import('@/views/general/Blog/Editor/Edit/'),
                        meta: { authRequired: true }
                    }
                ]
            }
        ]
    }
]
