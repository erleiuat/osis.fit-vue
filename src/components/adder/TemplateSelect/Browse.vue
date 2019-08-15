<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <form v-on:submit.prevent="doSearch()">
            <v-layout row wrap align-center pa-2>
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

        <v-layout wrap justify-center align-start pl-0 pr-0>
            <v-flex xs6 v-for="(arr, key) in items" :key="key">
                <v-layout column fill-height>
                    <v-flex xs12 v-for="item in arr" :key="item.id" @click="$emit('select', item)">
                        <v-card :class="isFav(item.id) ? 'yellow' : ''" :light="isFav(item.id)" class="fill-height" link ripple>
                            <v-img v-if="item.image" :src="item.image" :height="100" />
                            <v-card-title class="title">
                                {{item.title}}
                            </v-card-title>
                            <v-card-text class="caption">
                                Standartmenge: {{ item.amount }}<br />
                                Kalorien / 100: {{ item.caloriesPer100 }}<br />
                                Total: {{ item.total }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
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
            searchQuery: this.$route.query.s || '',
            searched: false,
            typerTimer: null,
            results: []
        }
    },

    computed: {

        items () {
            var items = this.results
            if (items.length <= 0) return false

            var i = 1; var col1 = []; var col2 = []

            items.forEach(item => {
                if (i === 1) {
                    col1.push(item)
                    i++
                } else if (i === 2) {
                    col2.push(item)
                    i = 1
                }
            })
            return {
                a: col1,
                b: col2
            }
        }

    },

    methods: {

        isFav (itemID) {
            if (this.$store.getters['foodFavorite/id'](itemID)) return true
            else return false
        },

        toggleFav (item) {
            if (this.isFav(item.id)) this.$store.dispatch('foodFavorite/delete', item.id)
            else this.$store.dispatch('foodFavorite/add', item)
        },

        changeIn () {
            this.searched = false
            clearTimeout(this.typerTimer)
            this.typerTimer = setTimeout(() => {
                this.doSearch()
            }, 800)
        },

        doSearch () {
            if (this.searchQuery.length < 3) return
            this.$store.dispatch('foodFavorite/search', this.searchQuery).then(res => {
                this.results = res.items
            }).catch(err => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: err })
            }).finally(() => {
                this.searched = true
            })
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
