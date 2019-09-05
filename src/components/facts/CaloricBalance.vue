<template>
    <v-card :color="state.color" :dark="state.dark" :loading="loading" flat>
        <v-card-title class="display-1">
            {{ $t('title') }}
        </v-card-title>
        <v-card-text>
            <v-row no-gutters align="end" justify="space-between" style="height: 95px">

                <v-col cols="auto">
                    <div class="display-2">{{ remaining }}</div>
                    <div class="caption">{{ dailyRequire }} {{ $t('calNeed') }}</div>
                    <div class="caption">{{ dailyTarget }} {{ $t('calLoss') }}</div>
                </v-col>

                <v-col cols="auto" class="caption text-right">
                    {{ cVals.pal }} PAL<br />
                    {{ cVals.lost }} {{ $t('burned') }}<br />
                    {{ cVals.consumed }} {{ $t('consumed') }}
                </v-col>

                <v-col cols="12">
                    <v-progress-linear :value="progress" :color="state.dark?'white':'black'" />
                </v-col>

            </v-row>
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

        loading () {
            if (!this.$store.getters['loading']) return false
            else if (this.state.dark) return 'white'
            else return 'black'
        },

        progress () {
            var val = this.remaining / (this.dailyTarget + this.dailyRequire)
            return 100 - val * 100
        },

        state () {
            if (this.remaining > 100) return { dark: true, color: 'success' }
            else if (this.remaining <= 0 && this.remaining > -100) return { dark: true, color: 'warning' }
            else if (this.remaining <= -100) return { dark: true, color: 'error' }
            else return { dark: false, color: '' }
        },

        dailyTarget () {
            var diff = new Date(this.cVals.aimDate).getTime() - new Date().getTime()
            var days = Math.round(diff / (1000 * 60 * 60 * 24))
            return Math.round(
                (this.cVals.aimWeight - this.cVals.weight) /
                days * 7000
            )
        },

        remaining () {
            var doneToday = this.dailyRequire + this.cVals.lost - this.cVals.consumed
            return Math.round(this.dailyTarget + doneToday)
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
                calNeed: 'Daily conversion',
                calLoss: 'Savings',
                bmr: 'Basal Metabolic Rate',
                consumed: 'Consumed',
                burned: 'Burned'
            },
            de: {
                title: 'Kalorienbilanz',
                calNeed: 'Umsatz',
                calLoss: 'Sparen',
                bmr: 'Grundumsatz',
                consumed: 'Konsumiert',
                burned: 'Verbrannt'
            }
        }
    }

}
</script>
