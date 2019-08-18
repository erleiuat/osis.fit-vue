<template>
    <v-container grid-list-md pt-0 fill-height>

        <v-layout wrap>
            <v-flex xs12>

                <v-layout wrap align-center>
                    <v-flex grow>
                        <div class="headline">{{ $t('title') }}</div>
                    </v-flex>
                </v-layout>

                <v-layout wrap align-start pl-0 pr-0>
                    
                    <v-flex xs6 sm4 lg3 v-for="item in items" :key="item.id">
                        <v-card link ripple @click="toggleFav(item)" :color="isFav(item.id) ? 'yellow darken-2' : ''">
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

                    <v-flex xs12 v-if="!items && this.$route.query.s">
                        {{ $t('nonefound') }}
                    </v-flex>

                </v-layout>

            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import foodFavorite from '@/store/modules/foodFavorite'

export default {
    name: 'Browse',

    modules: {
        foodFavorite
    },

    data () {
        return {
            searched: false,
            typerTimer: null,
            results: []
        }
    },

    computed: {

        items () {
            var items = this.results
            if (items.length <= 0) return false
            else return items
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
            if (!this.$route.query.s || this.$route.query.s.length < 3) return
            this.$store.dispatch('foodFavorite/search', this.$route.query.s).then(res => {
                this.results = res.items
            }).catch(err => {
                this.$notify({ type: 'error', title: this.$t('alert.error.default'), text: err })
            }).finally(() => {
                this.searched = true
            })
        }
    },

    watch: {
        '$route' (to, from) {
            this.changeIn()
        }
    },

    mounted () {
        this.$store.dispatch('foodFavorite/load')
        if (!this.$route.query.s) this.$router.replace({query: {s: this.$t('placehold')}})
        this.doSearch()
    },

    i18n: {
        messages: {
            en: {
                title: 'Search Items',
                nonefound: 'No Results',
                placehold: 'Apple'
            },
            de: {
                title: 'Lebensmittel suchen',
                nonefound: 'Keine Resultate',
                placehold: 'Apfel'
            }
        }
    }
}
</script>
