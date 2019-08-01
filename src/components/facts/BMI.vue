<template>
    <v-card v-if="bmi" :color="state.color" :dark="state.dark">
        <v-card-title class="display-1">
            BMI
        </v-card-title>
        <v-card-text>
            <v-layout wrap align-end>

                <v-flex xs12>
                    <div class="display-2">{{ bmi }}</div>
                    <div class="caption">{{ state.text }}</div>
                </v-flex>

            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'BMIFacts',

    computed: {

        state () {
            if (!this.bmi)
                return { color: '', dark: false, text: '' }
            if (this.bmi > 30)
                return { color: 'error', dark: true, text: this.$t('eq.over') }
            if (this.bmi > 25)
                return { color: 'warning', dark: true, text: this.$t('eq.slightOver') }
            if (this.bmi > 18.5)
                return { color: 'success', dark: true, text: this.$t('eq.normal') }
            if (this.bmi > 17)
                return { color: 'warning', dark: true, text: this.$t('eq.slightUnder') }

            return { color: 'error', dark: true, text: this.$t('eq.under') }
        },

        bmi () {
            var weight = this.$store.getters['weight/getLatest'].weight
            var height = this.$store.state.user.height

            if (!weight || !height) return false

            var value = (
                Math.round(weight /
                    ((height / 1000) *
                        (height / 1000)) /
                    10) / 10
            )

            return value
        }

    },

    i18n: {
        messages: {
            en: {
                eq: {
                    over: 'Overweight',
                    slightOver: 'Slightly overweight',
                    normal: 'Normal weight',
                    slightUnder: 'Slightly underweight',
                    under: 'Underweight'
                },
                normal: 'Normal'
            },
            de: {
                eq: {
                    over: 'Übergewicht',
                    slightOver: 'Leichtes Übergewicht',
                    normal: 'Normalgewicht',
                    slightUnder: 'Leichtes Untergewicht',
                    under: 'Untergewicht'
                },
                normal: 'Normal'
            }
        }
    }

}
</script>
