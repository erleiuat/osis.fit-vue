<template>
    <v-layout row wrap justify-space-around pa-2>
        <v-flex xs12>
            <h1 class="display-1">{{ $t('view.blog.editor.title') }}</h1>
        </v-flex>
        <v-flex xs12>
            <v-list three-line>
                <template v-for="(post, index) in posts">
                    <v-list-tile :key="post.url" avatar ripple>
                        <v-list-tile-avatar>
                            <v-icon>description</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ post.title }}</v-list-tile-title>
                            <v-list-tile-sub-title class="caprion">{{ post.url }}</v-list-tile-sub-title>
                            <v-list-tile-sub-title><b>{{ post.publicationDate }}</b></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple :to="{name: 'blog.editor.edit', params: {url: post.url} }">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn icon ripple disabled>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < posts.length" :key="index"></v-divider>
                </template>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    name: 'List',

    data () {
        return {
            posts: [

            ]
        }
    },

    methods: {
        delPost (url, index) {
            var vm = this
            vm.$http.post('general/blog/delete/', { url: url }).then(function (r) {
                vm.posts.splice(index, 1)
            }).catch(function () {
                vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.loading = false
            })
        }
    },

    mounted () {
        var vm = this
        vm.$http.get('general/blog/read/edit/').then(function (r) {
            vm.posts = r.data.article
        }).catch(function () {
            vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
        }).finally(function () {
            vm.loading = false
        })
    }

}
</script>
