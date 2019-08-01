<template>
    <v-layout wrap justify-center align-space-around>

        <v-flex xs12 md4>
            <CaloricBalance />
        </v-flex>

        <v-flex xs12 md4>
            <BMIFacts />
        </v-flex>
        
        <v-flex xs12 md4>
            <WeightFacts />
        </v-flex>

    </v-layout>
</template>

<script>
const CaloricBalance = () => import('@/components/facts/CaloricBalance')
const BMIFacts = () => import('@/components/facts/BMI')
const WeightFacts = () => import('@/components/facts/Weight')

export default {
    name: 'Facts',

    components: {
        CaloricBalance,
        BMIFacts,
        WeightFacts
    }

}
</script>
