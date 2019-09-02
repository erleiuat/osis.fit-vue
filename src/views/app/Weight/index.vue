<template>
    <vcontainer fluid>

        <v-row dense>
            <v-col cols="12">
                <WeightChart />
            </v-col>
        </v-row>

        <WeightTable />

    </vcontainer>
</template>

<script>
import weight from '@/store/modules/weight'

const WeightTable = () => import('@/views/app/Weight/Table')
const WeightChart = () => import('@/components/charts/Weight')

export default {
    name: 'Weight',

    components: {
        WeightTable, WeightChart
    },

    modules: {
        weight
    },

    mounted () {
        this.$store.dispatch('weight/load')
    }

}
</script>
