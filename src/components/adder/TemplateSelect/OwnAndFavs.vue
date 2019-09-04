<template>
    <vcontainer class="pt-0">

        <v-row no-gutters>
            <v-col cols="12" class="pb-2">
                <v-text-field v-if="search" v-model="query" ref="search" @blur="search = false" autofocus clearable class="pt-0" hide-details single-line />
                <v-btn v-else @click="search = true" outlined block>
                    <strong>{{ query || $t('btn.search') }}</strong>
                    <v-icon right>search</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row dense justify="center">
            <v-col cols="6" md="4" v-for="(item, key) in items" :key="key">
                <FoodCard :item="item" @select="$emit('select', item)" nodetails :maxHeight="200" />
            </v-col>
            <v-col cols="auto" v-if="!items && !query">
                {{ $t('noneyet') }}
            </v-col>
            <v-col cols="auto" v-if="!items && query">
                {{ $t('nonefound') }}
            </v-col>
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
            var items = [...this.$store.getters['food/all']]

            if (this.$store.getters['auth/premium']) {
                items = [
                    ...items, ...this.$store.getters['foodFavorite/all']
                ]
            }

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
