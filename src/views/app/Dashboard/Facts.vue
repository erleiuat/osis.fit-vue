<template>
    <v-layout row wrap fill-height justify-space-around>
        <CalorieFacts />
        <BMIFacts />
        <WeightFacts />
    </v-layout>
</template>

<script>
const CalorieFacts = () => import('@/components/facts/Calorie')
const BMIFacts = () => import('@/components/facts/BMI')
const WeightFacts = () => import('@/components/facts/Weight')

export default {
    name: 'Facts',

    components: {
        CalorieFacts,
        BMIFacts,
        WeightFacts
    }

}
</script>
