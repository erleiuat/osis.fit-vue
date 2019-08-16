<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <v-layout row wrap align-center pa-2>
            <v-flex xs12>
                <div class="headline">{{ $t('title') }}</div>
            </v-flex>
        </v-layout>

        <v-layout wrap justify-center align-start pl-0 pr-0>
            <v-flex xs12 sm6 md4 v-for="(arr, key) in items" :key="key">
                <v-layout column fill-height>
                    <v-flex xs12 v-for="item in arr" :key="item.id" @click="toggleFav(item)">
                        <v-card :class="true ? 'amber lighten-3' : ''" :light="true" class="fill-height" link ripple>
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

        <v-layout row wrap v-if="!items">
            <v-flex xs12>
                {{ $t('notFound') }}
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import storeModule from '@/store/modules/foodFavorite'

export default {
    name: 'Favorite',

    computed: {

        items () {
            var items = this.$store.getters['foodFavorite/all']
            if (items.length <= 0) return false

            if (this.$vuetify.breakpoint.xsOnly || items.length < 2)
                return {
                    a: items
                }

            var i = 1; var col1 = []; var col2 = []; var col3 = []

            if (this.$vuetify.breakpoint.smOnly) {
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
            } else {
                items.forEach(item => {
                    if (i === 1) {
                        col1.push(item)
                        i++
                    } else if (i === 2) {
                        col2.push(item)
                        i++
                    } else if (i === 3) {
                        col3.push(item)
                        i = 1
                    }
                })
                return {
                    a: col1,
                    b: col2,
                    c: col3
                }
            }
        }

    },

    methods: {
        toggleFav (item) {
            this.$store.dispatch('foodFavorite/delete', item.id)
        }
    },

    mounted () {
        this.$store.dispatch('foodFavorite/load')
    },

    created () {
        this.$store.useModule(storeModule)
    },

    i18n: {
        messages: {
            en: {
                title: 'Your Favorites',
                notFound: "You don't have any favorites yet"
            },
            de: {
                title: 'Deine Favoriten',
                notFound: 'Du hast noch keine Favoriten'
            }
        }
    }

}
</script>
