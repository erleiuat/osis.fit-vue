<template>
    <v-flex xs12 md4 v-if="bmi">
        <v-card class="fill-height" :color="state.color" :dark="state.dark">
            <v-card-title>
                <div class="display-1">BMI</div>
            </v-card-title>
            <v-card-text class="pt-1" v-if="bmi">
                <v-layout row wrap align-end fill-height>
                    <v-flex xs6 class="display-2">
                        {{ bmi }}
                    </v-flex>
                    <v-flex xs6 class="text-xs-right">
                        <div class="title">{{ state.text }}</div>
                        <div class="caption">{{ $t('normal') }}: 18.5 - 25</div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
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
            var weight = this.$store.getters.latestWeight || false
            var height = this.$store.state.user.height || false

            if (!weight || !height) return false

            var value = (
                Math.round(weight.weight /
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
