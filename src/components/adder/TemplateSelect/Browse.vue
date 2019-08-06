<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">
        <form v-on:submit.prevent="doSearch()">
            <v-layout row wrap align-center pa-1>
                <v-flex xs12>
                    <v-select v-model="searchdb" :items="databases" label="" hide-details />
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="searchQuery" :readonly="loading" solo :placeholder="$t('seachPlace')" append-icon="search" @input="changeIn()" />
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
            <v-flex xs12 v-for="(item, index) in getResults" :key="index">
                <v-card class="fill-height" ripple @click="$emit('select-item', item)">
                    <v-card-text>
                        <v-layout row wrap class="text-truncate justify-space-between fill-height">
                            <v-flex xs10 class="title">
                                {{ item.title }}
                            </v-flex>
                            <v-flex xs10 class="caption">
                                {{ item.caloriesPer100 }} Kalorien
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
            searchQuery: '',
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
                return this.results.map(obj => {
                    return {
                        title: obj.foodName,
                        amount: '100',
                        caloriesPer100: obj.amount
                    }
                })
            else return false // TODO
        }

    },

    methods: {

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
                notFound: 'No results',
                seachPlace: 'Search...'
            },
            de: {
                notFound: 'Keine Suchergebnisse',
                seachPlace: 'Suchbegriff'
            }
        }
    }

}
</script>
