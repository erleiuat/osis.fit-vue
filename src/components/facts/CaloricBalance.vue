<template>
    <v-card :color="state.color" :dark="state.dark">
        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>
        <v-card-text>
            <v-layout wrap align-end>

                <v-flex grow>
                    <div class="display-2">{{ remaining }}</div>
                    <div class="caption">({{ dailyRequire }} {{ $t('calNeed') }})</div>
                </v-flex>

                <v-flex shrink text-right class="caption">
                    {{ cVals.pal }} PAL<br />
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
            birthdate: Number,
            pal: Number,
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
                this.bmr + this.cVals.lost - this.cVals.consumed
            )

            return Math.round(dailyCalDiff + doneToday)
        },

        dailyRequire () {
            return Math.round(this.bmr * this.cVals.pal)
        },

        bmr () {
            var dayNeed = this.$store.getters['user/bmr'](
                this.cVals.weight,
                this.cVals.height, this.cVals.gender, this.cVals.birthdate
            )
            return Math.round(dayNeed)
        }

    },

    i18n: {
        messages: {
            en: {
                title: 'Caloric Balance',
                calNeed: 'Daily calories',
                bmr: 'Basal Metabolic Rate',
                consumed: 'Consumed',
                burned: 'Burned'
            },
            de: {
                title: 'Kalorienbilanz',
                calNeed: 'Täglicher Kalorienbedarf',
                bmr: 'Grundumsatz',
                consumed: 'Konsumiert',
                burned: 'Verbrannt'
            }
        }
    }

}
</script>
