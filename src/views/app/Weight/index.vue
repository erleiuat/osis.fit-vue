<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0': 'grid-list-xl'">

        <v-layout row wrap justify-center>
            <v-flex xs12 class="text-center" v-if="!$vuetify.breakpoint.xs">
                <WeightAdder>
                    <template v-slot:default="trigger">
                        <v-btn depressed large block color="primary" v-on="trigger.on">
                            <v-icon left>add</v-icon>
                            {{ $t('addWeight') }}
                        </v-btn>
                    </template>
                </WeightAdder>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <WeightChart />
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <WeightTable />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
const WeightTable = () => import('@/views/app/Weight/Table')
const WeightAdder = () => import('@/components/adder/Weight')
const WeightChart = () => import('@/components/charts/Weight')
const BottomNav = () => import('@/views/app/Weight/BottomNav')

export default {
    name: 'Weight',

    components: {
        BottomNav, WeightTable, WeightAdder, WeightChart
    },

    mounted () {
        this.$store.dispatch('weight/load')
    },

    i18n: {
        messages: {
            en: {
                addWeight: 'Weight'
            },
            de: {
                addWeight: 'Gewicht'
            }
        }
    }

}
</script>
