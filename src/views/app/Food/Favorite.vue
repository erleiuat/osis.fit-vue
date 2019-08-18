<template>
    <v-container grid-list-md pt-0 fill-height>

        <v-layout wrap>
            <v-flex xs12>

                <v-layout wrap align-center>
                    <v-flex grow>
                        <div class="headline">{{ $t('title') }}</div>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn :to="{name: 'food.browse'}" fab depressed small color="primary">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout wrap align-start pl-0 pr-0>
                    <v-flex xs6 sm4 lg3 v-for="item in items" :key="item.id">
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
                    </v-flex>

                    <v-flex xs12 v-if="!items && !this.$route.query.s">
                        {{ $t('noneyet') }}
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
    name: 'Favorite',

    modules: {
        foodFavorite
    },

    computed: {

        items () {
            var items = this.$store.getters['foodFavorite/all']
            var query = this.$route.query.s || ''

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase() || '')
            )

            if (filtered.length <= 0) return false
            else return filtered
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

    i18n: {
        messages: {
            en: {
                title: 'Your Favorites',
                noneyet: 'You have not yet created your own templates',
                nonefound: 'No results',
            },
            de: {
                title: 'Deine Favoriten',
                notFound: 'Du hast noch keine Favoriten',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                nonefound: 'Keine Resultate',
            }
        }
    }

}
</script>
