<template>
    <v-card v-if="remaining" :color="state.color" :dark="state.dark">
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
                    {{ burned }} {{ $t('burned') }}<br />
                    {{ consumed }} {{ $t('consumed') }}
                </v-flex>

            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'CaloricBalance',

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

        weight () {
            return this.$store.getters['weight/getLatest'].weight
        },

        remaining () {

            var aimWeight = this.$store.state.user.aims.weight
            var aimDate = this.$store.state.user.aims.date

            if (!this.weight || !aimWeight || !aimDate) return false

            var diff = new Date(aimDate).getTime() - new Date().getTime()
            var days = Math.round(diff / (1000 * 60 * 60 * 24))

            var dailyCalDiff = Math.round(
                (aimWeight - this.weight) /
                days * 7000
            )

            var doneToday = (
                this.basalMetabolicRate + this.burned - this.consumed
            )

            var value = dailyCalDiff + doneToday

            return Math.round(value)
        },

        basalMetabolicRate () {

            var gender = this.$store.state.user.gender
            var birthdate = this.$store.state.user.birthdate
            var height = this.$store.state.user.height

            if (!gender || !birthdate || !height || !this.weight) return false

            var tmpDate = new Date(Date.now() - Date.parse(birthdate))
            var age = Math.abs(tmpDate.getUTCFullYear() - 1970)

            var dayNeed = 0
            if (gender === 'female') dayNeed = (
                655 +
                (9.5 * this.weight) +
                (1.9 * height) +
                (4.7 * age)
            )
            else dayNeed = (
                66 +
                (13.8 * this.weight) +
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
                basalMetabolicRate: 'BMR',
                consumed: 'Consumed',
                burned: 'Burned'
            },
            de: {
                title: 'Kalorienbilanz',
                basalMetabolicRate: 'GUS',
                consumed: 'Konsumiert',
                burned: 'Verbrannt'
            }
        }
    }

}
</script>
