<template>
    <v-container grid-list-xl pa-0>

        <v-layout row wrap justify-center>
            <v-flex sm6 class="text-center" v-if="!$vuetify.breakpoint.xs">
                <WeightAdder>
                    <template v-slot:default="trigger">
                        <v-btn depressed large block color="primary" v-on="trigger.on">
                            <v-icon left>add</v-icon>
                            {{ $t('addWeight') }}
                        </v-btn>
                    </template>
                </WeightAdder>
            </v-flex>
            <v-flex xs12>
                <WeightChart />
            </v-flex>
            <v-flex xs12>
                <WeightTable />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
import weight from '@/store/modules/weight'

const WeightTable = () => import('@/views/app/Weight/Table')
const WeightAdder = () => import('@/components/adder/Weight')
const WeightChart = () => import('@/components/charts/Weight')
const BottomNav = () => import('@/views/app/Weight/BottomNav')

export default {
    name: 'Weight',

    components: {
        BottomNav, WeightTable, WeightAdder, WeightChart
    },

    modules: {
        weight
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
