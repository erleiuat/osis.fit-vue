<template>
    <div>

        <v-tabs v-model="tab" grow icons-and-text>
            <v-tab class="ml-0">
                {{ $t('title') }}
                <v-icon>folder_open</v-icon>
            </v-tab>
            <v-tab class="ml-0">
                {{ $t('title2') }}
                <v-icon>layers</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">

            <v-tab-item>
                <vcontainer>
                    <v-row>
                        <v-col cols="12" v-for="item in items" :key="item.id">
                            <v-card link ripple @click="toggleFav(item)">
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
                        </v-col>

                        <v-col xs12 v-if="!items && !this.$route.query.s">
                            {{ $t('noneyet') }}
                        </v-col>

                        <v-col xs12 v-if="!items && this.$route.query.s">
                            {{ $t('nonefound') }}
                        </v-col>

                    </v-row>
                </vcontainer>
            </v-tab-item>

            <v-tab-item>
                <vcontainer>
                    <v-row>
                        <v-col cols="12" v-for="item in items2" :key="item.id">
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
                        </v-col>

                        <v-col cols="12" v-if="!items2 && !this.$route.query.s">
                            {{ $t('noquery') }}
                        </v-col>
                        <v-col cols="12" v-if="!items2 && this.$route.query.s">
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
                title: 'Your Favorites',
                title2: 'Database',
                noneyet: 'You have not yet created your own templates',
                nonefound: 'No results',
                noquery: 'Please enter a search query'
            },
            de: {
                title: 'Deine Favoriten',
                title2: 'Datenbank',
                notFound: 'Du hast noch keine Favoriten',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                nonefound: 'Keine Resultate',
                noquery: 'Du musst noch einen Suchbegriff eingeben'
            }
        }
    }

}
</script>
