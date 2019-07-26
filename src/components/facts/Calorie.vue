<template>
    <v-flex xs12 md4 v-if="basalMetabolicRate && remaining">
        <v-card class="fill-height" :color="state.color" :dark="state.dark">
            <v-card-title class="display-1">
                {{ $t('title') }}
            </v-card-title>
            <v-card-text class="pt-1" v-if="remaining">
                <v-layout row wrap align-end justify-center fill-height>
                    <v-flex xs6 class="display-2">
                        {{ remaining }}
                    </v-flex>
                    <v-flex xs6 class="text-xs-right caption">
                        {{ $t('burned') }}: {{ burned }}<br/>
                        {{ $t('consumed') }}: {{ consumed }}<br/>
                        {{ $t('basalMetabolicRate') }}: {{ basalMetabolicRate }}
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    name: 'CalorieFacts',

    computed: {

        state () {
            if (this.remaining > 300)
                return { dark: true, color: 'success' }
            else if (this.remaining > 100)
                return { dark: true, color: 'warning' }
            else if (this.remaining > -100)
                return { dark: false, color: '' }
            else
                return { dark: true, color: 'error' }
        },

        remaining () {
            var weight = this.$store.getters.latestWeight || false
            var aimWeight = this.$store.state.user.aims.weight || false
            var aimDate = this.$store.state.user.aims.date || false

            if (!weight || !aimWeight || !aimDate) return false

            var diff = new Date(aimDate).getTime() - new Date().getTime()
            var days = Math.round(diff / (1000 * 60 * 60 * 24))

            var dailyCalDiff = Math.round(
                (aimWeight - weight.weight) /
                days * 7000
            )

            var doneToday = (
                this.basalMetabolicRate + this.burned - this.consumed
            )

            var value = dailyCalDiff + doneToday

            return Math.round(value)
        },

        basalMetabolicRate () {
            var gender = this.$store.state.user.gender || false
            var birthdate = this.$store.state.user.birthdate || false
            var height = this.$store.state.user.height || false
            var weight = this.$store.getters.latestWeight || false

            if (!gender || !birthdate || !height || !weight) return false

            var tmpDate = new Date(Date.now() - Date.parse(birthdate))
            var age = Math.abs(tmpDate.getUTCFullYear() - 1970)

            var dayNeed = 0
            if (gender === 'female') dayNeed = (
                655 +
                (9.5 * weight.weight) +
                (1.9 * height) +
                (4.7 * age)
            )
            else dayNeed = (
                66 +
                (13.8 * weight.weight) +
                (5.0 * height) +
                (6.8 * age)
            )

            return Math.round(dayNeed)
        },

        consumed () {
            return this.$store.getters.totalCalories
        },

        burned () {
            return this.$store.getters.totalActivity
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
