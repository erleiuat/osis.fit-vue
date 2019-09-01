<template>
    <v-container>

        <v-layout wrap align-center pb-2>
            <v-toolbar dense fixed :tile="false">
                <v-text-field v-model="query" hide-details prepend-icon="search" single-line clearable />
            </v-toolbar>
        </v-layout>

        <v-layout wrap justify-center align-start pl-0 pr-0>
            <v-flex xs6 v-for="(arr, key) in items" :key="key">
                <v-layout column fill-height>
                    <v-flex xs12 v-for="(item, key) in arr" :key="key" class="pa-1">
                        <FoodCard :item="item" @select="$emit('select', item)" nodetails :maxHeight="200" />
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 v-if="!items && !query">
                {{ $t('noneyet') }}
            </v-flex>

            <v-flex xs12 v-if="!items && query">
                {{ $t('nonefound') }}
            </v-flex>

        </v-layout>

    </v-container>
</template>

<script>
import food from '@/store/modules/food'
import foodFavs from '@/store/modules/foodFavorite'

const FoodCard = () => import('@/components/food/Card')

export default {
    name: 'OwnAndFavs',

    components: {
        FoodCard
    },

    modules: {
        food,
        foodFavs
    },

    data () {
        return {
            query: null
        }
    },

    computed: {

        items () {
            var items = [
                ...this.$store.getters['food/all']
            ]
            if (this.$store.getters['auth/premium']) {
                items = [
                    ...items,
                    ...this.$store.getters['foodFavorite/all']
                ]
            }
            var filtered = items.filter(el => el.title.includes(this.query || ''))
            if (filtered.length <= 0) return false

            var i = 1; var col1 = []; var col2 = []

            filtered.forEach(item => {
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

    mounted () {
        this.$store.dispatch('food/load')
        if (this.$store.getters['auth/premium']) this.$store.dispatch('foodFavorite/load')
    },

    i18n: {
        messages: {
            en: {
                noneyet: 'You have not yet created your own templates',
                nonefound: 'No results',
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total'
            },
            de: {
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                nonefound: 'Keine Resultate',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total'
            }
        }
    }

}
</script>
