<template>
    <vcontainer class="pt-0">

        <v-row no-gutters>
            <v-col cols="12">
                <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable hide-details single-line />
                <v-btn v-else @click="search = true" text block>
                    <strong>{{ query || $t('btn.search') }}</strong>
                    <v-icon right>search</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row dense>
            <v-col cols="6" v-for="(item, key) in items" :key="key">
                <FoodCard :item="item" @select="$emit('select', item)" nodetails :maxHeight="200" />
            </v-col>

            <v-flex xs12 v-if="!items && !query">
                {{ $t('noneyet') }}
            </v-flex>

            <v-flex xs12 v-if="!items && query">
                {{ $t('nonefound') }}
            </v-flex>

        </v-row>

    </vcontainer>
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
            search: false,
            query: null
        }
    },

    computed: {

        items () {

            if (this.$store.getters['auth/premium']) var items = [
                ...this.$store.getters['food/all'],
                ...this.$store.getters['foodFavorite/all']
            ]
            else var items = [
                ...this.$store.getters['food/all']
            ]

            var query = this.query || ''
            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase() || '')
            )

            if (filtered.length <= 0) return false
            else return filtered

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
