<template>
    <v-container grid-list-xl>
        <v-layout row wrap justify-space-around>

            <v-flex xs12 sm10>
                <div class="display-1">{{ $t('title') }}</div>
                <div class="">{{ $t('text') }}</div>
            </v-flex>

            <v-flex xs12 sm6 v-for="post in posts" :key="post.id">
                <v-hover>
                    <v-card slot-scope="{ hover }" :to="{name: 'blog.article', params: {url: post.url} }" :class="`elevation-${hover ? 5 : 2}`" :color="post.color" :dark="post.dark" flat>
                        <v-img v-if="post.imgUrl" :src="post.imgUrl" max-height="200"></v-img>
                        <v-card-title class="display-1 pb-0">
                            {{ post.title }}
                        </v-card-title>
                        <v-card-text class="caption pb-0">
                            {{ post.description }}...
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn outline :to="{name: 'blog.article', params: {url: post.url} }">
                                {{ $t('more') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Overview',

    data () {
        return {
            posts: []
        }
    },

    mounted () {
        var vm = this
        vm.$http.get('general/blog/read/preview/').then(function (r) {
            vm.posts = r.data.preview
        }).catch(function () {
            vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
        }).finally(function () {
            vm.loading = false
        })
    },

    i18n: {
        messages: {
            en: {
                more: 'Read more',
                title: 'Blog & News',
                text: `
                    Here you can find everything about Osis.fit. 
                    We regularly post articles on new features and updates, 
                    as well as tutorials and tips for your weight loss success.
                `
            },
            de: {
                more: 'Weiterlesen',
                title: 'Blog & News',
                text: `
                    Hier kannst du alles rund um Osis.fit finden. 
                    Wir posten regelmässig Beiträge zu neuen Features und aktualisierungen, 
                    sowie Anleitungen und Tipps für deinen Erfolg beim Abnehmen.
                `
            }
        }
    }

}
</script>
