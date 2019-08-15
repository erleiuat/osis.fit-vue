<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <form v-on:submit.prevent="doSearch()">
            <v-layout row wrap align-center pa-2>
                <v-flex xs12>
                    <div class="headline">{{ $t('browse') }}</div>
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

            <v-flex xs6 sm4 md3 v-for="(item, index) in results" :key="index" @click="toggleFav(item)">
                <v-card class="fill-height" ripple>
                    <v-img v-if="item.image" class="white--text" :src="item.image" :max-height="100" />
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
                                    <v-icon large color="yellow" v-if="false">
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
            typerTimer: null,
            results: []
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
