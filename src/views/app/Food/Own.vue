<template>
    <vcontainer align="center">

        <router-view name="editor" />

        <v-row dense justify="center">
            <v-col cols="12" sm="6" md="4" v-for="(item, key) in items" :key="key">
                <FoodCard :item="item" @select="$router.push({name: 'food.edit', params: {id: item.id}})" nodetails />
            </v-col>
            <v-col cols="auto" v-if="!items && !this.$route.query.s">
                {{ $t('noneyet') }}
            </v-col>
            <v-col cols="auto" v-if="!items && this.$route.query.s">
                {{ $t('nonefound') }}
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
import FoodCard from '@/components/food/Card'
import food from '@/store/modules/food'

export default {
    name: 'Own',

    components: {
        FoodCard
    },

    modules: {
        food
    },

    computed: {

        items () {
            var query = this.$route.query.s || ''
            var items = this.$store.getters['food/all']
            if (!items) return false

            var filtered = items.filter(el =>
                el.title.toUpperCase().includes(query.toUpperCase() || '')
            )

            if (filtered.length <= 0) return false
            else return filtered
        }

    },

    mounted () {
        this.$store.dispatch('food/load')
    },

    i18n: {
        messages: {
            en: {
                title: 'Your Templates',
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total',
                noneyet: 'You have not yet created your own templates',
                nonefound: 'No results',
                removeImgError: 'Image remove failed'
            },
            de: {
                title: 'Deine Vorlagen',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                nonefound: 'Keine Resultate',
                removeImgError: 'Bild entfernen fehlgeschlagen'
            }
        }
    }

}
</script>
