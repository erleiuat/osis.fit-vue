<template>
    <v-container grid-list-xl>
        <v-layout row wrap justify-space-around>

            <v-flex xs12 sm9>
                <div class="display-1">{{ p.title }}</div>
            </v-flex>

            <v-flex xs12 sm10 v-html="p.content">

            </v-flex>

            <v-flex xs6 text-xs-right>
                {{ p.publicationDate }}
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Article',

    data () {
        return {
            p: {
                url: '',
                title: '',
                content: '',
                keywords: '',
                publicationDate: ''
            }
        }
    },

    mounted () {
        var vm = this
        if (vm.$route.params.url)
            vm.$http.post('general/blog/read/content/', { url: vm.$route.params.url }).then(function (r) {
                vm.p = r.data.article
            }).catch(function () {
                vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
                vm.$router.push({ name: 'error.found' })
            }).finally(function () {
                vm.loading = false
            })
    }

}
</script>
