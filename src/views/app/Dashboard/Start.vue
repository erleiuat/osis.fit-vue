<template>
    <v-layout wrap justify-space-around align-center>

        <v-flex xs12 md4 v-if="cals.show" pa-1>
            <CaloricBalance :cVals="cals.cVals" />
        </v-flex>

        <v-flex xs12 v-else pa-1>
            <Welcome />
        </v-flex>

        <v-flex xs12 md4 v-if="weight.show" pa-1>
            <WeightFacts :cVals="weight.cVals" />
        </v-flex>

        <v-flex xs12 md4 v-if="bmi.show" pa-1>
            <BMIFacts :cVals="bmi.cVals" />
        </v-flex>

    </v-layout>
</template>

<script>
const Welcome = () => import('@/views/app/Dashboard/Welcome')
const CaloricBalance = () => import('@/components/facts/CaloricBalance')
const BMIFacts = () => import('@/components/facts/BMI')
const WeightFacts = () => import('@/components/facts/Weight')

export default {
    name: 'Start',

    components: {
        CaloricBalance,
        BMIFacts,
        WeightFacts,
        Welcome
    },

    mounted () {
        var td = this.$store.getters['app/today']
        this.$store.dispatch('weight/load')
        this.$store.dispatch('user/load')
        this.$store.dispatch('calories/load', td)
        this.$store.dispatch('activity/load', td)
    },

    computed: {

        lastWeight () {
            var lWeight = this.$store.getters['weight/getLatest'] || { weight: 0 }
            return {
                ok: (lWeight.weight > 0),
                weight: lWeight.weight
            }
        },

        user () {
            var gend = this.$store.state.user.gender
            var heig = this.$store.state.user.height
            var birth = this.$store.state.user.birthdate
            return {
                ok: (gend && heig && birth),
                gender: gend,
                height: heig,
                birth: birth
            }
        },

        aims () {
            var aWeight = this.$store.state.user.aims.weight
            var aDate = this.$store.state.user.aims.date
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

            var tmpDate = new Date(Date.now() - Date.parse(this.user.birth))
            var age = Math.abs(tmpDate.getUTCFullYear() - 1970)

            var td = this.$store.getters['app/today']
            var cTotal = this.$store.getters['calories/total'](td) || 0
            var aTotal = this.$store.getters['activity/total'](td) || 0

            return {
                show: true,
                cVals: {
                    weight: this.lastWeight.weight,
                    aimWeight: this.aims.weight,
                    aimDate: this.aims.date,
                    gender: this.user.gender,
                    height: this.user.height,
                    age: age,
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
