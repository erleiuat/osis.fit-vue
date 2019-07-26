<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pl-0 pr-0 grid-list-md': 'grid-list-md'">

        <v-layout row wrap v-if="getTemplateItems.length > 0">
            <v-flex xs12 v-for="(item, index) in getTemplateItems" :key="index">
                <v-card class="fill-height" @click="$emit('select-item', item)">
                    <v-img v-if="item.imgUrl" :lazy-src="item.imgLazy" :src="item.imgUrl" height="150px" />
                    <v-card-text>
                        <v-layout row wrap class="text-truncate justify-space-between fill-height">
                            <v-flex xs12>
                                <div class="title">{{item.title}}</div>
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('amount') }}</div>
                                {{item.amount}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('calories') }}</div>
                                {{item.caloriesPer100}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('total') }}</div>
                                {{ Math.round(item.amount/100*item.caloriesPer100) }}
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else-if="!loaded1">
            <v-flex xs12 sm12>
                <v-progress-linear indeterminate height="10" />
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else>
            <v-flex xs12>
                - {{ $t('noneyet') }}
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="getFavItems.length > 0">
            <v-flex xs12 v-for="(item, index) in getFavItems" :key="index">
                <v-card class="fill-height" @click="$emit('select-item', item)">
                    <v-card-text>
                        <v-layout row wrap class="text-truncate justify-space-between fill-height">
                            <v-flex xs12>
                                <div class="title">{{item.title}}</div>
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('amount') }}</div>
                                {{item.amount}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('calories') }}</div>
                                {{item.caloriesPer100}}
                            </v-flex>
                            <v-flex shrink>
                                <div class="caption">{{ $t('total') }}</div>
                                {{ Math.round(item.amount/100*item.caloriesPer100) }}
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else-if="!loaded2">
            <v-flex xs12 sm12>
                <v-progress-linear indeterminate height="10" />
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else>
            <v-flex xs12>
                - {{ $t('noneyet2') }}
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    name: 'OwnAndFavs',

    data () {
        return {
            loaded1: false,
            loaded2: false,
            favItems: [],
            templateItems: []
        }
    },

    computed: {

        getTemplateItems () {
            return this.templateItems
        },

        getFavItems () {
            return this.favItems
        }

    },

    mounted () {
        this.getTemplates()
        this.getFavs()
    },

    methods: {

        getTemplates () {
            var vm = this
            vm.loaded1 = false

            vm.$http.post('user/food/read/').then(function (r) {
                vm.$store.state.data.food = r.data.food || []
                vm.templateItems = vm.$store.state.data.food
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.loaded1 = true
            })
        },

        getFavs () {
            var vm = this
            vm.loaded2 = false

            vm.$http.post('user/food/favorite/read/').then(function (r) {
                vm.$store.state.data.foodFavorite = r.data.foodFavorite || []
                vm.favItems = vm.$store.state.data.foodFavorite
            }).catch(function (e) {
                vm.$notify({ type: 'error', text: vm.$t('alert.error.load') })
            }).finally(function () {
                vm.loaded2 = true
            })
        }

    },

    i18n: {
        messages: {
            en: {
                noneyet: 'You have not yet created your own templates',
                noneyet2: "You don't have any favorites yet",
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total'
            },
            de: {
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                noneyet2: 'Du hast noch keine Favoriten',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total'
            }
        }
    }

}
</script>
