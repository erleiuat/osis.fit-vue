<template>
    <v-row dense justify="center" align="center" style="min-height: 207px">

        <v-col cols="12" md="4" v-if="cals.show">
            <CaloricBalance :cVals="cals.cVals" />
        </v-col>
        <v-col cols="12" md="4" v-else-if="showLoader">
            <v-progress-circular :size="70" :width="7" indeterminate />
        </v-col>
        <v-col cols="12" v-else>
            <Welcome />
        </v-col>
        <v-col cols="12" md="4" v-if="weight.show">
            <WeightFacts :cVals="weight.cVals" />
        </v-col>
        <v-col cols="12" md="4" v-if="bmi.show">
            <BMIFacts :cVals="bmi.cVals" />
        </v-col>

    </v-row>
</template>

<script>
const Welcome = () => import('@/views/app/Dashboard/Welcome')
const CaloricBalance = () => import('@/components/facts/CaloricBalance')
const BMIFacts = () => import('@/components/facts/BMI')
const WeightFacts = () => import('@/components/facts/Weight')

export default {
    name: 'Start',

    data () {
        return {
            loaded: false
        }
    },

    components: {
        CaloricBalance,
        BMIFacts,
        WeightFacts,
        Welcome
    },

    computed: {

        showLoader () {
            if (this.loaded) {
                return false
            } else {
                if (this.$store.getters['loading']) {
                    return true
                } else {
                    this.loaded = true
                    return false
                }
            }
        },

        lastWeight () {
            var lWeight = this.$store.getters['weight/latest'] || { weight: 0 }
            return {
                ok: (lWeight.weight > 0),
                weight: lWeight.weight
            }
        },

        user () {
            var data = this.$store.getters['user/metabolism']
            if (!data) return { ok: false }
            var gend = data.gender
            var heig = data.height
            var birthdate = data.birthdate
            var pal = data.pal
            return {
                ok: (gend && heig && birthdate && pal),
                gender: gend,
                height: heig,
                birthdate: birthdate,
                pal: pal
            }
        },

        aims () {
            var data = this.$store.getters['user/aims']
            if (!data) return { ok: false }
            var aWeight = data.weight
            var aDate = data.date
            return {
                ok: (aWeight && aDate),
                weight: aWeight,
                date: aDate
            }
        },

        weight () {
            return {
                show: this.lastWeight.ok,
                cVals: {
                    weight: this.lastWeight.weight,
                    aimWeight: this.aims.weight
                }
            }
        },

        cals () {
            if (!this.user.ok || !this.aims.ok || !this.lastWeight.ok) return { show: false }

            var td = this.$store.getters['today'].date
            var cTotal = Math.round(this.$store.getters['calories/total'](td)) || 0
            var aTotal = Math.round(this.$store.getters['activity/total'](td)) || 0

            return {
                show: true,
                cVals: {
                    weight: this.lastWeight.weight,
                    aimWeight: this.aims.weight,
                    aimDate: this.aims.date,
                    gender: this.user.gender,
                    birthdate: this.user.birthdate,
                    height: this.user.height,
                    pal: this.user.pal,
                    consumed: cTotal,
                    lost: aTotal
                }
            }
        },

        bmi () {
            return {
                show: (this.lastWeight.ok && this.user.height),
                cVals: {
                    weight: this.lastWeight.weight,
                    height: this.user.height
                }
            }
        }

    }

}
</script>
