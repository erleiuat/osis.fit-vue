<template>
    <v-container :class="$vuetify.breakpoint.xs ? 'pa-0': 'grid-list-xl'">

        <v-layout row wrap justify-center>
            <v-flex xs12 class="text-xs-center" v-if="!$vuetify.breakpoint.xs">
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
                <WeightsTable />
            </v-flex>
        </v-layout>

        <BottomNav v-if="$vuetify.breakpoint.xs" />

    </v-container>
</template>

<script>
import WeightsTable from '@/views/app/Weights/Table'

const WeightAdder = () => import('@/components/adders/Weight')
const WeightChart = () => import('@/components/charts/Weight')
const BottomNav = () => import('@/views/app/Weights/BottomNav')

export default {
    name: 'Weights',

    components: {
        BottomNav, WeightsTable, WeightAdder, WeightChart
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
