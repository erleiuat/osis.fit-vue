<template>
    <v-card :color="state.color" :dark="state.dark">
        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>
        <v-card-text>
            <v-layout wrap align-end>

                <v-flex xs6>
                    <div class="display-2">{{ remaining }}</div>
                    <div class="caption">{{ basalMetabolicRate }} {{ $t('basalMetabolicRate') }}</div>
                </v-flex>

                <v-flex xs6 text-right class="caption">
                    {{ cVals.lost }} {{ $t('burned') }}<br />
                    {{ cVals.consumed }} {{ $t('consumed') }}
                </v-flex>

            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'CaloricBalance',

    props: {
        cVals: {
            weight: Number,
            aimWeight: Number,
            aimDate: Number,
            gender: String,
            age: Number,
            height: Number,
            consumed: Number,
            lost: Number
        }
    },

    computed: {

        state () {
            if (this.remaining > 300) return { dark: true, color: 'success' }
            else if (this.remaining > 100) return { dark: true, color: 'warning' }
            else if (this.remaining > -100) return { dark: false, color: '' }
            else return { dark: true, color: 'error' }
        },

        remaining () {
            var diff = new Date(this.cVals.aimDate).getTime() - new Date().getTime()
            var days = Math.round(diff / (1000 * 60 * 60 * 24))

            var dailyCalDiff = Math.round(
                (this.cVals.aimWeight - this.cVals.weight) /
                days * 7000
            )

            var doneToday = (
                this.basalMetabolicRate + this.cVals.lost - this.cVals.consumed
            )

            return Math.round(dailyCalDiff + doneToday)
        },

        basalMetabolicRate () {
            var dayNeed = 0
            if (this.cVals.gender === 'female') {
                dayNeed = (
                    655 +
                    (9.5 * this.cVals.weight) +
                    (1.9 * this.cVals.height) +
                    (4.7 * this.cVals.age)
                )
            } else {
                dayNeed = (
                    66 +
                    (13.8 * this.cVals.weight) +
                    (5.0 * this.cVals.height) +
                    (6.8 * this.cVals.age)
                )
            }

            return Math.round(dayNeed)
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Caloric Balance',
                basalMetabolicRate: 'Basal Metabolic Rate',
                consumed: 'Consumed',
                burned: 'Burned'
            },
            de: {
                title: 'Kalorienbilanz',
                basalMetabolicRate: 'Grundumsatz',
                consumed: 'Konsumiert',
                burned: 'Verbrannt'
            }
        }
    }

}
</script>
