<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0 grid-list-md': 'grid-list-md'">

        <v-layout row wrap align-center pa-2>
            <v-flex xs12>
                <div class="headline">{{ $t('title') }}</div>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="getItems.length > 0">
            <v-flex xs12 sm6 v-for="(item, index) in getItems" :key="index" @click="toggleFav(item)">
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

        <v-layout row wrap v-else-if="!$store.state.app.loading">
            <v-flex xs12>
                {{ $t('notFound') }}
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    name: 'Favorite',

    data () {
        return {
            items: []
        }
    },

    computed: {
        getItems () {
            return this.items
        }
    },

    mounted () {
        this.getFavs()
    },

    methods: {

        getFavs () {
            var vm = this
            vm.$store.commit('loading', true)
            vm.$http.post('user/food/favorite/read/').then(function (r) {
                vm.$store.state.data.foodFavorite = r.data.foodFavorite || []
                vm.items = vm.$store.state.data.foodFavorite
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.$store.commit('loading', false)
            })
        },

        isStarred (foodId) {
            return true
        },

        toggleFav (item) {
            var vm = this
            var index = vm.$store.state.data.foodFavorite.indexOf(item)
            vm.$http.post('user/food/favorite/toggle/', item).then(function (r) {
                if (index > -1) if (index > -1) vm.$store.state.data.foodFavorite.splice(index, 1)
            }).catch(function () {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            })
        }

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
