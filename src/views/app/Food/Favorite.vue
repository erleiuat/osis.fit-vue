<template>
    <div>

        <v-tabs v-model="tab" grow fixed icons-and-text>
            <v-tab class="ml-0">
                {{ $t('title') }}
                <v-icon>star</v-icon>
            </v-tab>
            <v-tab class="ml-0">
                {{ $t('title2') }}
                <v-icon>layers</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <vcontainer>
                    <v-row dense justify="center">
                        <v-col cols="6" md="4" v-for="item in items" :key="item.id">
                            <v-card outlined hover style="height: 100%" @click="toggleFav(item)">
                                <v-img v-if="item.image" :src="item.image" :height="100" />
                                <v-card-text>
                                    <div class="body-2">
                                        {{item.title}}
                                    </div>
                                    <div class="caption">
                                        Standartmenge: {{ item.amount }}<br />
                                        Kalorien / 100: {{ item.caloriesPer100 }}<br />
                                        Total: {{ item.total }}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="auto" v-if="!items && $store.getters['loading']">
                            <v-progress-circular indeterminate />
                        </v-col>
                        <v-col cols="12" v-else-if="!items && !this.$route.query.s">
                            {{ $t('noneyet') }}
                        </v-col>
                        <v-col cols="12" v-else-if="!items">
                            {{ $t('nonefound') }}
                        </v-col>

                    </v-row>
                </vcontainer>
            </v-tab-item>

            <v-tab-item>
                <vcontainer>
                    <v-row dense>
                        <v-col cols="6" md="4" v-for="item in items2" :key="item.id">
                            <v-card @click="toggleFav(item)" :color="isFav(item.id) ? 'amber' : ''" link hover ripple outlined style="height: 100%">
                                <v-img v-if="item.image" :src="item.image" :height="100" />
                                <v-card-text :class="isFav(item.id) ? 'black--text' : ''">
                                    <div class="body-2">
                                        {{item.title}}
                                    </div>
                                    <div class="caption">
                                        Standartmenge: {{ item.amount }}<br />
                                        Kalorien / 100: {{ item.caloriesPer100 }}<br />
                                        Total: {{ item.total }}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="auto" v-if="!items2 && $store.getters['loading']">
                            <v-progress-circular indeterminate />
                        </v-col>
                        <v-col cols="12" v-else-if="!items2 && !this.$route.query.s">
                            {{ $t('noquery') }}
                        </v-col>
                        <v-col cols="12" v-else-if="!items2">
                            {{ $t('nonefound') }}
                        </v-col>

                    </v-row>
                </vcontainer>
            </v-tab-item>

        </v-tabs-items>
    </div>
</template>

<script>
import foodFavorite from '@/store/modules/foodFavorite'

export default {
    name: 'Favorite',

    modules: {
        foodFavorite
    },

    data () {
        return {
            tab: null,
            searched: false,
            typerTimer: null,
            results: []
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['foodFavorite/all']
            var query = this.$route.query.s || ''
            if (!items) return false

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase() || '')
            )

            if (filtered.length <= 0) return false
            else return filtered
        },

        items2 () {
            var items = this.results
            if (items.length <= 0) return false
            else return items
        }

    },

    methods: {
        toggleFav (item) {
            if (this.isFav(item.id)) this.$store.dispatch('foodFavorite/delete', item.id)
            else this.$store.dispatch('foodFavorite/add', item)
        },
        isFav (itemID) {
            if (this.$store.getters['foodFavorite/id'](itemID)) return true
            else return false
        },
        changeIn () {
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
        this.doSearch()
    },

    i18n: {
        messages: {
            en: {
                title: 'Favorites',
                title2: 'Database',
                noneyet: 'You have no favorites yet',
                nonefound: 'No results',
                noquery: 'Please enter a search query'
            },
            de: {
                title: 'Favoriten',
                title2: 'Datenbank',
                notFound: 'Du hast noch keine Favoriten',
                noneyet: 'Du hast noch keine Favoriten',
                nonefound: 'Keine Resultate',
                noquery: 'Du musst noch einen Suchbegriff eingeben'
            }
        }
    }

}
</script>
