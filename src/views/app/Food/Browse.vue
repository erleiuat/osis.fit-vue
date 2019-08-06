<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <form v-on:submit.prevent="doSearch()">
            <v-layout row wrap align-center pa-2>
                <v-flex grow>
                    <div class="headline">{{ $t('browse') }}</div>
                </v-flex>
                <v-flex shrink>
                    <v-select v-model="searchdb" :items="databases" solo hide-details flat />
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="searchQuery" :readonly="loading" hide-details append-icon="search" @input="changeIn()" />
                </v-flex>
                <v-flex xs12 v-show="false">
                   <v-btn type="submit"></v-btn>
                </v-flex>
            </v-layout>
        </form>

        <v-layout row wrap v-if="loading">
            <v-flex xs12 sm12>
                <v-progress-linear indeterminate height="10" />
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="results.length > 0">
            <v-flex xs12 sm6 v-for="(item, index) in getResults" :key="index" @click="toggleFav(item)">
                <v-card class="fill-height" ripple>
                    <v-card-text>
                        <v-layout row wrap class="text-truncate justify-space-between fill-height">
                            <v-flex xs10 class="title">
                                {{ item.title }}
                            </v-flex>
                            <v-flex xs10 class="caption">
                                {{ item.caloriesPer100 }} Kalorien
                            </v-flex>
                            <v-flex xs2>
                                <v-btn icon>
                                    <v-icon large color="yellow" v-if="isStarred(item.id)">
                                        star
                                    </v-icon>
                                    <v-icon large color="yellow" v-else>
                                        star_border
                                    </v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="results.length < 1 && searched">
            <v-flex xs12>
                {{ $t('notFound') }}
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    name: 'Browse',

    data () {
        return {
            loading: false,
            searchQuery: this.$route.query.s,
            searched: false,
            results: [],
            typerTimer: null,
            searchdb: 'sndb',
            databases: [
                { text: 'Schweizer Nährwertdatenbank', value: 'sndb' }
            ]
        }
    },

    computed: {
        getResults () {
            if (this.searchdb === 'sndb')
                var formatted = this.results.map(obj => {
                    var rObj = {
                        id: obj.foodid,
                        title: obj.foodName,
                        amount: '100',
                        caloriesPer100: obj.amount,
                        source: this.searchdb
                    }
                    return rObj
                })

            return formatted
        }
    },

    mounted () {
        this.getFavs()
        this.doSearch()
    },

    methods: {

        getFavs () {
            var vm = this
            vm.$http.post('user/food/favorite/read/').then(function (r) {
                vm.$store.state.data.foodFavorite = r.data.foodFavorite || []
            }).catch(function (e) {
                vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
            }).finally(function () {

            })
        },

        isStarred (foodId) {
            var vm = this
            var str = vm.$store.state.data.foodFavorite
            return str.find(o => o.id === foodId) || false
        },

        toggleFav (item) {
            var vm = this
            vm.$http.post('user/food/favorite/toggle/', item).then(function (r) {
                if (r.data.added) vm.$store.state.data.foodFavorite.push(item)
                else {
                    var storeObj = vm.isStarred(item.id)
                    var index = vm.$store.state.data.foodFavorite.indexOf(storeObj)
                    if (index > -1) vm.$store.state.data.foodFavorite.splice(index, 1)
                }
            }).catch(function () {
                vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
            })
        },

        changeIn () {
            this.searched = false
            clearTimeout(this.typerTimer)
            this.typerTimer = setTimeout(() => {
                this.doSearch()
            }, 800)
        },

        doSearch () {
            var vm = this
            if (!vm.searchQuery || vm.searchQuery.length <= 2) return

            vm.loading = true
            vm.$router.push({ name: vm.$route.name, query: { s: vm.searchQuery } })
            if (vm.searchdb === 'sndb') {
                var path = 'https://api.webapp.prod.blv.foodcase-services.com/BLV_WebApp_WS/webresources/BLV/foods?search=' +
                    vm.searchQuery + '&component=25640&operator=%3E&amount=0&lang=de'

                vm.$http.get(path).then(function (r) {
                    if (r.data.length > 0) vm.results = r.data
                    else vm.results = []
                }).catch(function () {
                    vm.$notify({ type: 'error', title: vm.$t('alert.error.load') })
                }).finally(function () {
                    vm.searched = true
                    vm.loading = false
                })
            }
        }

    },

    i18n: {
        messages: {
            en: {
                browse: 'Search Items',
                notFound: 'No results'
            },
            de: {
                browse: 'Lebensmittel suchen',
                notFound: 'Keine Suchergebnisse'
            }
        }
    }
}
</script>
