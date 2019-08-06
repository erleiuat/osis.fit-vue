<template>
    <v-container>

        <v-layout wrap justify-center align-start pl-0 pr-0>
            <v-flex xs6 v-for="(arr, key) in items" :key="key">
                <v-layout column fill-height>
                    <v-flex xs12 v-for="(item, key) in arr" :key="key" class="pa-1">
                        <FoodCard :item="item" @select="$emit('select', item)" />
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
const FoodCard = () => import('@/components/food/Card')

export default {
    name: 'OwnAndFavs',

    components: {
        FoodCard
    },

    data () {
        return {
            query: ''
        }
    },

    computed: {

        items () {
            var items = this.$store.getters['food/all']
            var filtered = items.filter(el => el.title.includes(this.query))

            console.log(filtered)
            if (filtered.length <= 0) return false

            var i = 1; var col1 = []; var col2 = [];

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
